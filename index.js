var jade = require('jade');
var fs = require('fs');
var path = require('path');
var hljs = require('highlight.js');
var express = require('express');
var app = express();
var context = require('./context.js');

context.groups
    .map(group => group.pages)
    .reduce((mem, el) => mem.concat(...el), [])
    .forEach(el => el.tabs = el.tabs || []);

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

var getGroup = function getGroup (id) {

    const group = context.groups.find(group => group.id === id);

    if (!group) {
        throw new Error('Could not find group: ' + id);
    }

    return group;
};


var getPage = function (pageId) {
    return context.groups
        .map(group => group.pages)
        .reduce((mem, el) => mem.concat(...el), [])
        .find(el => el.id === pageId);
};

var getTab = function (page, tabId) {
    return page.tabs
        .find(el => el.id === tabId);
};

var getTemplate = function (templateId) {
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

var getResponse = function (groupId, pageId, tabId, templateId) {

    const template = getTemplate(templateId);
    const page = getPage(pageId);
    const tab = getTab(page, tabId);
    const path = tab && tab.file ? tab.file : page.file;

    if (tabId && !tab || !path) {
        return getNotFound();
    }

    var file = fs.readFileSync(path, 'utf-8');

    context.content = md.render(file);
    context.currentTemplate = templateId;
    context.currentGroup = getGroup(groupId);
    context.currentPage = page;
    context.currentTabId = tab && tab.id;
    context.currentPageId = pageId;

    //pass all context object in context property - used in raw theme
    context.context = context.context || JSON.stringify(context, null, 4);

    return jade.compile(template, {})(context);
};

var getNotFound = function () {

    const template = getTemplate('default');

    context.content = 'Page not found';

    return jade.compile(template, {})(context);
};

const getDefaultTab = function getDefaultTab (pageId) {

    const page = getPage(pageId);
    return page.tabs && page.tabs.length ? page.tabs[0].id : 'default';
};

app.use('/themes', express.static(context.themesDir));

app.get('/:group/:page/:tab?', function (req, res, next) {

    const groupId = req.params.group;
    const pageId = req.params.page;
    const templateId = req.query.template || 'default';
    let tabId = req.params.tab;

    const page = getPage(pageId);

    if (!getGroup(groupId) || !page) {
        next();
        return;
    }

    // no tab selected and no file for page specified
    if (!tabId && !page.file) {
        tabId = getDefaultTab(pageId);
    }

    res.send(getResponse(groupId, pageId, tabId, templateId));
});


app.get('/', function (req, res) {
    res.send(getResponse(context.default.group, context.default.page, undefined, 'default'));
});

app.get('*', function (req, res) {
    res.send(getNotFound());
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});