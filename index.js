var jade = require('jade');
var fs = require('fs-extra');
var path = require('path');
var hljs = require('highlight.js');
var express = require('express');
var cloneDeep = require('lodash.clonedeep');


var md = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            var preview = '';

            try {

                if (lang === 'html') {
                    preview = `<div class="docs-example clearfix">${str}</div>`;
                }

                return preview + hljs.highlight(lang, str, true).value;
            } catch (__) {
            }
        }

        return ''; // use external default escaping
    }
});

var getGroup = function getGroup (id, context) {

    const group = context.groups.find(group => group.id === id);

    if (!group) {
        throw new Error('Could not find group: ' + id);
    }

    return group;
};

var parseContext = function (rawContext) {

    const context = cloneDeep(rawContext);

    context.groups
        .map(group => group.pages)
        .reduce((mem, el) => mem.concat(...el), [])
        .forEach(el => el.tabs = el.tabs || []);

    return context;
};

var getPage = function (pageId, context) {
    return context.groups
        .map(group => group.pages)
        .reduce((mem, el) => mem.concat(...el), [])
        .find(el => el.id === pageId);
};

var getTab = function (page, tabId) {
    return page.tabs
        .find(el => el.id === tabId);
};

var getTemplate = function (templateId, context) {
    const templateData = context.themes
        .find(el => el.id === templateId);

    if (!templateData) {
        throw new Error('Could not find theme definition for: ' + templateId);
    }

    const content = fs.readFileSync(path.join(context.themesDir, templateData.id, templateData.entry), 'utf-8');

    if (!content) {
        throw new Error('Could not read content for theme: ' + templateId);
    }

    return content;
};

var getResponse = function (groupId, pageId, tabId, templateId, context) {

    console.log('getResponse', groupId, pageId, tabId, templateId);

    const template = getTemplate(templateId, context);
    const page = getPage(pageId, context);
    const tab = getTab(page, tabId);
    const path = tab && tab.file ? tab.file : page.file;

    if (tabId && !tab || !path) {
        return getNotFound(context);
    }

    var file = fs.readFileSync(path, 'utf-8');

    context.content = md.render(file);
    context.currentTemplate = templateId;
    context.currentGroup = getGroup(groupId, context);
    context.currentPage = page;
    context.currentTabId = tab && tab.id;
    context.currentPageId = pageId;

    //pass all context object in context property - used in raw theme
    context.context = context.context || JSON.stringify(context, null, 4);

    return jade.compile(template, {})(context);
};

var getNotFound = function (context) {

    const template = getTemplate('default', context);

    context.content = 'Page not found';

    return jade.compile(template, {})(context);
};

const getDefaultTab = function getDefaultTab (pageId, context) {

    const page = getPage(pageId, context);
    return page.tabs && page.tabs.length ? page.tabs[0].id : 'default';
};

var serve = function serve (port, context) {

    var app = express();

    app.use('/themes', express.static(context.themesDir));

    app.get('/:group/:page/:tab?', function (req, res, next) {

        const groupId = req.params.group;
        const pageId = req.params.page;
        const templateId = req.query.template || 'default';
        let tabId = req.params.tab;

        const page = getPage(pageId, context);

        if (!getGroup(groupId, context) || !page) {
            next();
            return;
        }

        // no tab selected and no file for page specified
        if (!tabId && !page.file) {
            tabId = getDefaultTab(pageId, context);
        }

        res.send(getResponse(groupId, pageId, tabId, templateId, context));
    });


    app.get('/', function (req, res) {
        res.send(getResponse(context.default.group, context.default.page, undefined, 'default', context));
    });

    app.get('*', function (req, res) {
        res.send(getNotFound(context));
    });

    app.listen(port, function () {
        console.log('Example app listening on port ' + port +'!')
    });
};

module.exports = function Primer (rawContext) {

    const context = parseContext(rawContext);

    this.serve = function (port) {
        serve(port || 3000, context);
    };

    this.build = function (buildPath, templateId) {
        fs.removeSync(buildPath);
        fs.mkdirSync(buildPath);

        const filePath = path.join(buildPath,  'index.html');

        const content = getNotFound(context);
        fs.outputFile(filePath, content);

        fs.copy(context.themesDir, path.join(buildPath, context.themesDir));

        context.groups.forEach(group => {

            group.pages.forEach(page => {

                const filePath = path.join(buildPath, group.id, page.id, 'index.html');

                const tabId = page.file ? null : getDefaultTab(page.id, context);

                const content = getResponse(group.id, page.id, tabId, templateId, context);
                fs.outputFile(filePath, content);

                page.tabs.forEach(tab => {
                    const filePath = path.join(buildPath, group.id, page.id, tab.id, 'index.html');

                    const content = getResponse(group.id, page.id, tab.id, templateId, context);
                    fs.outputFile(filePath, content);

                });
            });

        });
        console.log('build', buildPath);
    }
};