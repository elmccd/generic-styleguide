var jade = require('jade');
var fs = require('fs');
var hljs = require('highlight.js');

/**
 * Generates a url-safe "slug" form of a string.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} string String value.
 * @return {string} URL-safe form of a string.
 * @example
 *
 * _.slugify('A Test')
 * // => a-test
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

                console.log('dddd', str, lang);

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

var sendResponse = function (groupId, pageId, tabId, template) {
    context.content = [];
    context.tabs = context.tabs || [];

    console.log('getPage(page)', getPage(pageId));

    if (pageId) {
        var pageObj = getPage(pageId);
        context.currentGroup = getGroup(groupId);
        context.currentTabs = pageObj.tabs;
        pageObj.tabs = pageObj.tabs || [];
        // context.content = pageObj.tabs.map(tab => {
        //     var file = fs.readFileSync(tab.file, 'utf-8');
        //     tab.content = md.render(file);
        //     return tab;
        // });

        var tab = getTab(pageObj, tabId);
        var path = tab && tab.file ? tab.file : pageObj.file;

        context.currentTab = tab && tab.id;

        var file = fs.readFileSync(path, 'utf-8');
        context.content = md.render(file);

        context.currentPage = pageId;


        var fn = jade.compile(template, options);

        console.log(context);

        return fn(context);
    } else {
        return 'Not Found';
    }
};

app.use(express.static('./'));

app.get('/', function (req, res) {
    res.send(sendResponse());
});


app.get('/:group/:page/:tab?/:template?', function (req, res) {

    const groupId = req.params.group;
    const pageId = req.params.page;
    const tabId = req.params.tab;
    const templateId = req.params.template;

    if (!tabId) {
        res.redirect(`/${groupId}/${pageId}/preview`);
        return;
    }
    if (!templateId) {
        res.redirect(`/${groupId}/${pageId}/${tabId}/default`);
        return;
    }

    if (getPage(pageId)) {
        var template = fs.readFileSync(templateId + '.jade', 'utf-8');
        res.send(sendResponse(groupId, pageId, tabId, template));
    } else {
        res.end(404);
    }
});

app.use(express.static('./'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});