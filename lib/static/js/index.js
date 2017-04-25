'use strict';


//---------//
// Imports //
//---------//

const $ = require('domtastic')
  , initTagFilter = require('./init-tag-filter')
  , initSearch = require('./init-search')
  ;


//------//
// Main //
//------//

window.addEventListener('load', () => {
  initTagFilter();

  // keep in mind this happens after awesomplete finishes messing with the dom,
  //   so the nodes are not the same as they were right after 'load'
  attachFocusListeners();

  initSearch();
});


//-------------//
// Helper Fxns //
//-------------//

function attachFocusListeners() {
  $('.input-with-icon').each(el => {
    const iconDel = $(el.children[0])
      , inputEl = $(el).find('input[type="text"]')[0]
      ;

    inputEl.addEventListener('focus', () => {
      iconDel.addClass('focused');
    });
    inputEl.addEventListener('blur', () => {
      iconDel.removeClass('focused');
    });
  });
}
