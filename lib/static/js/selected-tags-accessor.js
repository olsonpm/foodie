'use strict';


//---------//
// Imports //
//---------//

const fp = require('lodash/fp');


//------//
// Main //
//------//

let currentTags = [];

const selectedTagsAccessor = {
  get: () => currentTags
  , set: tags => { currentTags = tags; return selectedTagsAccessor; }
  , add: aTag => { currentTags.push(aTag); return selectedTagsAccessor; }
  , remove: aTag => {
    currentTags = fp.pull(aTag, currentTags);
    return selectedTagsAccessor;
  }
  , isLaden: () => !!currentTags.length
  , isEmpty: () => !currentTags.length
};


//---------//
// Exports //
//---------//

module.exports = selectedTagsAccessor;
