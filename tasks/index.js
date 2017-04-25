'use strict';


//---------//
// Imports //
//---------//

const pify = require('pify');

const buildAssets = require('./build-assets')
  , buildTags = require('./build-tags')
  , gulp = require('gulp')
  , path = require('path')
  , pFs = pify(require('fs'))
  , startServer = require('../lib/server/start')
  , yargs = require('yargs')
  ;


//------//
// Init //
//------//

const argv = yargs.argv;


//------//
// Main //
//------//

gulp.task('build-tags', buildTags);
gulp.task('start-server', ['build-assets'], () => startServer(argv));

gulp.task('build-assets', () => {
  //
  // if tags.json doesn't exist, then we want to build it.  This check exists
  //   so that we don't build the tags every time we start the server (using up
  //   the api limit).
  //
  return pFs.readFile(path.join(__dirname, '../lib/api/tags.json'))
    .catch(() => {
      return buildTags();
    })
    .then(() => buildAssets(argv))
    ;
});
