'use strict';

const fs = require('fs-extra');
const path = require('path');
const express = require('express');
const _ = require('lodash');

const getThemeTemplate = function (templateId, context) {

  const templateData = context.themes
    .find(el => el.id === templateId);

  if (!templateData) {
    throw new Error('Could not find theme definition for: ' + templateId);
  }

  const content = fs.readFileSync(path.join(context.themesDir, templateData.id, templateData.entry), 'utf-8');

  if (!content) {
    throw new Error('Could not read content for theme: ' + templateId);
  }

  return {
    data: templateData,
    content
  };
};

const getExtensionParser = (filePath, extensions) => {

  if (!filePath) {
    return;
  }

  const fileName = path.basename(filePath);
  const ext = _.last(fileName.split('.'));

  return extensions[ext];
};

const getResponseRawContent = (page, parsers) => {

  if (page.content) {
    return page.content(parsers);
  } else if (page.file) {
    return fs.readFileSync(page.file, 'utf-8');
  } else {
    throw new Error('You must provide content or file property for every page. Missing in: ' + page.id)
  }
};

const getResponseContent = (page, parsers, extensions, rawContent) => {

  if (page.parser && parsers[page.parser]) {
    return parsers[page.parser](rawContent)
  } else if (_.isFunction(page.parser)) {
    return page.parser(rawContent)
  } else if (parsers[getExtensionParser(page.file, extensions)]) {
    return parsers[getExtensionParser(page.file, extensions)](rawContent)
  } else {
    return rawContent;
  }
};

const getResponse = function (params) {
  const theme = params.theme;
  const page = params.page;
  const context = params.context;
  const segments = params.segments;
  const parsers = params.parsers || {};
  const extensions = params.extensions || {};

  console.log('Building page:', theme + '/' + segments.join('/'));

  const rawContent = getResponseRawContent(page, parsers);
  const content = getResponseContent(page, parsers, extensions, rawContent);

  const templateOptions = _.clone({
    context,
    theme,
    page,
    segments,
    content
  });

  if (theme === 'raw') {
    return JSON.stringify(templateOptions, null, 4);
  }

  const template = getThemeTemplate(theme, context, extensions);
  const extensionParser = getExtensionParser(template.data.entry, extensions);

  if (extensionParser) {
    return parsers[extensionParser](template.content, templateOptions)
  } else {
    return _.template(template.content)(templateOptions);
  }
};

const getFirstPage = pages => {
  if (pages && pages[0]) {
    if (pages[0].pages) {
      return getFirstPage(pages[0].pages);
    } else {
      return pages[0];
    }
  }
};

const findPage = (segments, pages) => {

  if (segments && segments.length) {

    let segment = segments[0];
    let restSegments = segments.slice(1);

    let foundPage = pages.find(el => el.id === segment);

    if (foundPage) {
      if (foundPage.pages) {
        if (restSegments.length) {
          return findPage(restSegments, foundPage.pages)
        } else {
          return getFirstPage(foundPage.pages)
        }
      } else {
        return foundPage;
      }
    }
  }
};

const isTheme = (themeId, context) => {

  return themeId && context.themes.find(e => e.id === themeId);
};

const serve = function serve(port, contextObj) {

  const app = express();

  let context;

  app.use('/themes', express.static(contextObj.value.themesDir));

  if (contextObj.value.publicDir) {
    app.use(express.static(contextObj.value.publicDir));
  }

  app.get('/:theme?/*', function (req, res) {

    context = contextObj.getContext();

    const theme = req.params.theme || context.defaultTheme;
    const segments = req.params.theme ? req.params[0].split('/') : context.default;

    //path is not empty, but theme is not recognized
    if (req.params.theme && !isTheme(req.params.theme, context) && req.params.theme !== 'raw') {
      res.sendStatus(404);
      return;
    }

    const page = findPage(segments, context.pages);

    if (page) {
      if (req.params.theme === 'raw') {
        res.setHeader('Content-Type', 'application/json');
      }
      res.send(getResponse({
        theme, page, context, segments,
        parsers: contextObj.parsers,
        extensions: contextObj.extensions
      }));
    } else {
      res.sendStatus(404);
    }
  });

  app.listen(port, function () {
    console.log('Listening on port ' + port + '!')
  });
};

module.exports = function Primer(contextObject) {

  this.serve = function (port) {
    serve(port || 3000, contextObject);
  };

  const buildSetup = function (buildPath, themesDir) {

    fs.removeSync(buildPath);
    fs.mkdirsSync(buildPath);

    fs.copy(themesDir, path.join(buildPath, 'themes'));
  };

  this.build = function (buildPath, themesIds) {
    const context = contextObject.value;
    const extensions = contextObject.extensions;
    const parsers = contextObject.parsers;

    buildSetup(buildPath, context.themesDir);

    //show only enabled themes
    context.themes = context.themes.filter(theme => themesIds.indexOf(theme.id) > -1);

    const buildPage = (page, segments, themeId, defaultFilePath) => {
      const filePath = defaultFilePath || path.join.apply(null, [buildPath, themeId].concat(segments).concat('index.html'));

      const content = getResponse({
        theme: themeId,
        page: page,
        context,
        segments: segments,
        parsers,
        extensions
      });

      fs.outputFile(filePath, content);
    };

    const buildPages = (page, segments, themeId) => {

      //build "leaf" page
      if (!page.pages) {
        buildPage(page, segments, themeId)
      } else {
        // build parent page using first page of its children
        const firstPage = getFirstPage(page.pages);
        if (firstPage) {
          buildPage(
            firstPage,
            segments.concat(firstPage.id),
            themeId,
            path.join.apply(null, [buildPath, themeId].concat(segments).concat('index.html'))
          );
        }

        //build all children pages
        page.pages.forEach(subPage => {
          buildPages(subPage, segments.concat(subPage.id), themeId);
        });
      }

    };

    //build homepage
    const homePage = findPage(context.default, context.pages);
    const homeSegments = context.default;
    const homeTheme = context.defaultTheme;

    buildPage(homePage, homeSegments, homeTheme, path.join(buildPath, 'index.html'));

    themesIds.forEach(themeId => {
      context.pages.forEach(page => buildPages(page, [page.id], themeId))
    });

    console.log('Building done');
  }
};
