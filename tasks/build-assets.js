'use strict';

//
// TODO
// - Precompile all templates prior to starting the server.  Then whenever one
//   of the templates is modified, recompile all the templates, re-require
//   them in the server, and rebuild the javascript.  This would be a cleaner
//   way then re-reading the templates in each time they are modified and having
//   separate files precompiled for the client only.
//


//---------//
// Imports //
//---------//

const pify = require('pify');

const cpFile = require('cp-file')
  , fp = require('lodash/fp')
  , handlebars = require('handlebars')
  , liveReloadService = require('../lib/server/live-reload-service')
  , nodeSassCssImporter = require('node-sass-css-importer')
  , path = require('path')
  , pFs = pify(require('fs'))
  , pGaze = pify(require('gaze'))
  , pRimraf = pify(require('rimraf'))
  , pWebpack = pify(require('webpack'))
  , nodeSass = pify(require('node-sass'))
  , webpackConfig = require('./webpack.config')
  ;

const { pAll, then } = require('../lib/utils');


//------//
// Init //
//------//

const staticDir = path.join(__dirname, '../lib/static')
  , distDir = path.join(__dirname, '../dist')
  ;

const clientPartials = ['restaurants', 'results', 'tag', 'tag-bucket', 'x']
  , cssImporter = nodeSassCssImporter()
  , indexScss = path.join(staticDir, 'scss/index.scss')
  , fontsDir = path.join(staticDir, 'fonts')
  , imagesDir = path.join(staticDir, 'img')
  , logErr = err => { console.error(err); }
  , outCss = path.join(distDir, 'index.css')
  , outFontsDir = path.join(distDir, 'fonts')
  , outImagesDir = path.join(distDir, 'img')
  , partialsDir = path.join(__dirname, '../lib/hbs/partials')
  , precompiledOut = path.join(__dirname, '../lib/static/js/precompiled-templates.js')
  , writeFile = fp.curry(
    (fname, contents) => pFs.writeFile(fname, contents)
  )
  ;


//------//
// Main //
//------//

const buildAssets = ({ enableLr } = {}) => {
  if (enableLr) {
    liveReloadService.startServer();
  }

  return Promise.resolve()
    .then(cleanDist)
    .then(() => Promise.all([
      buildJs()
      , buildScss()
      , copyFonts()
      , copyImages()
      , precompileTemplates()
    ]))
    .catch(logErr)
    .then(() => {
      if (enableLr) {
        watch();
      }
    })
    .catch(logErr)
    ;
};



//-------------//
// Helper Fxns //
//-------------//

function cleanDist() {
  return pRimraf(distDir)
    .then(() => pFs.mkdir(distDir))
    ;
}

function buildJs() {
  return precompileTemplates()
    .then(() => pWebpack(webpackConfig))
    ;
}

function precompileTemplates() {
  return fp.flow(
    fp.map(pNameToTemplatePairs)
    , pAll
    , then(fp.flow(
      fp.map(precompile)
      , fp.map(toStringProperties)
      , fp.join(',\n')
      , contents => 'module.exports = {' + contents + '\n};'
      , writeTemplateFile
    ))
  )(clientPartials);
}

function writeTemplateFile(contents) {
  return pFs.writeFile(precompiledOut, contents);
}

function toStringProperties([name, precompiledTemplate]) {
  return `"${name}": ${precompiledTemplate}`;
}

function precompile([name, aTemplate]) {
  return [name, handlebars.precompile(aTemplate)];
}

function pNameToTemplatePairs(templateName) {
  return Promise.all([
    templateName
    , pFs.readFile(path.join(partialsDir, templateName + '.hbs'), 'utf8')
  ]);
}

function buildScss() {
  return nodeSass.render({
      file: indexScss
      , follow: true
      , importer: [cssImporter]
    })
    .then(fp.flow(
      fp.get('css')
      , writeFile(outCss)
    ))
    ;
}

function copyFonts() {
  return pFs.readdir(fontsDir)
    .then(fp.flow(
      fp.map(aFontPath => path.join(fontsDir, aFontPath))
      , fp.map(copyTo(outFontsDir))
      , pAll
    ))
    ;
}

function copyImages() {
  return pFs.readdir(imagesDir)
    .then(fp.flow(
      fp.map(imgPath => path.join(imagesDir, imgPath))
      , fp.map(copyTo(outImagesDir))
      , pAll
    ))
    ;
}

function copyTo(destDir) {
  return src => cpFile(
    src
    , path.join(destDir, path.basename(src))
  );
}

function watch() {
  pGaze(path.join(distDir, '**/*'))
    .then(watcher => {
      // On file changed
      watcher.on('changed', filepath => {
        liveReloadService.get(getRelativeToDist(filepath));
      });
    })
    .catch(logErr)
    ;

  pGaze(path.join(staticDir, 'scss/**/*'))
    .then(watcher => {
      let scssBuildQueue = Promise.resolve();
      watcher.on('all', () => {
        scssBuildQueue = scssBuildQueue.then(buildScss)
          .catch(logErr)
          ;
      });
    })
    .catch(logErr)
    ;

  pGaze(path.join(staticDir, 'js/**/*'))
    .then(watcher => {
      let jsBuildQueue = Promise.resolve();
      watcher.on('all', () => {
        jsBuildQueue = jsBuildQueue.then(buildJs)
          .catch(logErr)
          ;
      });
    })
    .catch(logErr)
    ;
}

function getRelativeToDist(fpath) {
  return fpath.slice(distDir.length);
}


//---------//
// Exports //
//---------//

module.exports = buildAssets;
