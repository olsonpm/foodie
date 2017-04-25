//---------//
// Imports //
//---------//

const pify = require('pify');

const extensionless = require('extensionless')
  , fp = require('lodash/fp')
  , handlebars = require('handlebars')
  , path = require('path')
  , pFs = pify(require('fs'))
  ;

const { pProps, uEach } = require('../utils');


//------//
// Init //
//------//

const compile = fp.curry((hbs, str) => hbs.compile(str))
  , readFile = fname => pFs.readFile(fname, 'utf8')
  , registerAPartial = fp.curry(
    (hbs, str, name) => hbs.registerPartial(name, str)
  )
  ;


//------//
// Main //
//------//

const createRender = () => {
  const hbs = handlebars.noConflict();
  registerHelpers(hbs);
  return Promise.all([
      compileBase(hbs)
      , registerPartials(hbs)
    ])
    // we only need the result of `compileBase`, which will be the compiled
    //   template function
    .then(fp.head)
    ;
};


//-------------//
// Helper Fxns //
//-------------//

function compileBase(hbs) {
  return readFile(path.join(__dirname, '../hbs/base.hbs'))
    .then(compile(hbs))
    ;
}

function registerPartials(hbs) {
  const dir = path.join(__dirname, '../hbs/partials');
  return pFs.readdir(dir)
    .then(fp.flow(
      fp.reduce(
        (partialNameToFileContent, fname) => fp.set(
          extensionless(fname)
          , readFile(path.join(dir, fname))
          , partialNameToFileContent
        )
        , {}
      )
      , pProps
    ))
    .then(partialNameToFileContent => {
      uEach(
        registerAPartial(hbs)
        , partialNameToFileContent
      );
    })
    ;
}

function registerHelpers(hbs) {
  hbs.registerHelper('debug', function(optionalValue) {
    console.log('Current Context');
    console.log('====================');
    console.log(this);

    if (optionalValue) {
      console.log('\nValue');
      console.log('====================');
      console.log(optionalValue);
    }
  });
}


//---------//
// Exports //
//---------//

module.exports = createRender;
