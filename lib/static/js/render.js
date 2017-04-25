'use strict';


//---------//
// Imports //
//---------//

const fp = require('lodash/fp')
  , handlebars = require('handlebars/dist/handlebars.runtime')
  , precompiledTemplates = require('./precompiled-templates')
  ;


//------//
// Init //
//------//

const templates = fp.mapValues(toTemplate, precompiledTemplates);
registerPartials(templates);


//------//
// Main //
//------//

const render = (partialName, ctx) => {
  if (!templates[partialName]) {
    throw new Error(
      "partial doesn't exist: " + partialName
      + "\n choose from: " + fp.flow(fp.keys, fp.join(', '))(templates)
    );
  }
  return templates[partialName](ctx);
};


//-------------//
// Helper Fxns //
//-------------//

function registerPartials(templates) {
  return handlebars.registerPartial(templates);
}

function toTemplate(rawTpl) {
  return handlebars.template(rawTpl);
}


//---------//
// Exports //
//---------//

module.exports = render;
