'use strict';


//---------//
// Imports //
//---------//

const $ = require('domtastic')
  , axios = require('axios')
  , fp = require('lodash/fp')
  , notify = require('./notify')
  , render = require('./render')
  , selectedTagsAccessor = require('./selected-tags-accessor')
  ;


//------//
// Init //
//------//

const notification = getNotifications()
  , resultsEl = document.getElementById('results')
  , resultsDel = $(resultsEl)
  , searchEl = document.getElementById('search')
  , searchDel = $(searchEl)
  , spinnerDel = $(document.getElementById('spinner'))
  ;


//------//
// Main //
//------//

const initSearch = () => {
  searchEl.addEventListener('click', () => {
    if (selectedTagsAccessor.isEmpty()) {
      notify(notification.needTag);
      return;
    }

    spinnerDel.removeClass('absent');
    searchDel.addClass('disabled');
    return axios.get('/search?tags=' + fp.join(',', selectedTagsAccessor.get()))
      .then(({ data }) => {
        const { restaurants, totalResults } = data
          , resultsAmountDescriptor = getDescriptor(totalResults)
          ;

        resultsDel.removeClass('absent');
        resultsEl.innerHTML = render('results', {
          restaurants
          , resultsAmountDescriptor
        });
        spinnerDel.addClass('absent');
        searchDel.removeClass('disabled');
      })
      ;
  });
};


//-------------//
// Helper Fxns //
//-------------//

function getDescriptor(totalResults) {
  if (totalResults >= 20) {
    return `${important(20)} results of ${important(totalResults)}`;
  } else if (totalResults === 1) {
    return 'the only result';
  } else if (totalResults === 0) {
    return 'No results found!';
  } else {
    return `all ${important(totalResults)} results`;
  }
}

function important(str) {
  return `<span class="important">${str}</span>`;
}

function getNotifications() {
  return {
    needTag: {
      message: "Please apply at least one tag"
      , polarity: 'error'
    }
  };
}


//---------//
// Exports //
//---------//

module.exports = initSearch;
