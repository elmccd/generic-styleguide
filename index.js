var jade = require('jade');
var fs = require('fs');
var path = require('path');
var hljs = require('highlight.js');

/**
 * Generates a url-safe "slug" form of a string.
 */
function slugify(string) {
    return string.toString().trim().toLowerCase().replace(/ /g, '-').replace(/([^a-zA-Z0-9\._-]+)/, '');
}

var md = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            var preview = '';

            try {

                if (lang === 'html') {
                    preview = `<div class="docs-example clearfix">${str}</div>`;
                }

                return preview + hljs.highlight(lang, str, true).value;
            } catch (__) {}
        }

        return ''; // use external default escaping
    }
});

const options = {};

var express = require('express');
var app = express();
var context = require('./context.js');

context.groups.forEach(el => {
   el.slug = slugify(el.title);
});


var getGroup = function getGroup (slug) {

    return context.groups.find(group => group.slug === slug);
};


var getPage = function (page) {
    return context.groups
        .map(group => group.pages)
        .reduce((mem, el) => mem.concat(...el), [])
        .find(el => el.id === page)
};

var getTab = function (page, tabId) {
    return page.tabs
        .find(el => el.id === tabId);
};

var getTemplate = function (template) {
    return context.themes
        .find(el => el.id === template);
};

var sendResponse = function (groupId, pageId, tabId, template) {

    if (pageId) {
        var pageObj = getPage(pageId);
        context.currentGroup = getGroup(groupId);
        context.currentTabs = pageObj.tabs;
        context.defaultTab = getDefaultTab(pageId);

        var tab = getTab(pageObj, tabId);
        var path = tab && tab.file ? tab.file : pageObj.file;

        context.currentTab = tab && tab.id;

        var file = fs.readFileSync(path, 'utf-8');
        context.content = md.render(file);

        context.currentPage = pageId;

        context.context = context.context || JSON.stringify(context, null, 4);

    } else {
        context.content = 'Page not found';
    }
    var fn = jade.compile(template, options);

    return fn(context);
};

app.use(express.static('./'));

const getDefaultTab = function getDefaultTab (pageId) {
    const page = getPage(pageId);
    return page.tabs && page.tabs.length ? page.tabs[0].id : 'default';
};

app.get('/:group/:page/:tab?', function (req, res, next) {

    const groupId = req.params.group;

    if (!getGroup(groupId)) {
        next();
        return;
    }
    const pageId = req.params.page;
    let tabId = req.params.tab;
    const templateId = req.query.template || 'default';

    context.currentTemplate = templateId;
    
    const page = getPage(pageId);

    if (page) {

        if (!tabId && !page.file) {
            tabId = getDefaultTab(pageId);
        }
        page.tabs = page.tabs || [];

        const templateObj = getTemplate(templateId);
        const templateEntry = path.join(context.themesDir, templateObj.id, templateObj.entry);

        var template = fs.readFileSync(templateEntry, 'utf-8');
        res.send(sendResponse(groupId, pageId, tabId, template));
    } else {
        res.end(404);
    }
});

app.use('/themes', express.static(context.themesDir));


app.get('*', function (req, res) {
    const templateObj = getTemplate('default');
    const templateEntry = path.join(context.themesDir, templateObj.id, templateObj.entry);

    var template = fs.readFileSync(templateEntry, 'utf-8');
    res.send(sendResponse(null, null, null, template));
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});