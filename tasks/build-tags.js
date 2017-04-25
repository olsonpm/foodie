'use strict';


//---------//
// Imports //
//---------//

const pify = require('pify');

const fp = require('lodash/fp')
  , packageJson = require('../package')
  , path = require('path')
  , pFs = pify(require('fs'))
  , pMkdirp = pify(require('mkdirp'))
  , requestFromApi = require('../lib/server/request-from-api')
  ;

const { pProps, uMapKeys, uMapValues, uReduce } = require('../lib/utils');


//------//
// Init //
//------//

const { milwaukeeId } = packageJson.zomato
  , logErr = err => { console.error(err); }
  , resourceToSingular = getResourceToSingular()
  , resourceToNormalizeFn = getResourceToNormalizeFn()
  , tagsFilePath = path.join(__dirname, '../lib/api/tags.json')
  ;


//------//
// Main //
//------//

const buildTags = () => {
  const toApiResults = createToApiResults({ city_id: milwaukeeId });

  // apiResults will be an object whose values are promises
  const apiResults = fp.reduce(
    toApiResults
    , {}
    , ['categories', 'cuisines', 'establishments']
  );

  return pProps(apiResults)
    .then(fp.flow(
      uMapValues(normalizeResults)
      , uMapKeys(toSingular)
      , uReduce(toTags, {})
      , pWriteToApiTags
    ))
    .catch(logErr)
    ;
};


//-------------//
// Helper Fxns //
//-------------//

function toSingular(_val, key) {
  return resourceToSingular[key];
}

function getResourceToSingular() {
  return {
    categories: 'category'
    , cuisines: 'cuisine'
    , establishments: 'establishment'
  };
}

function normalizeResults(apiResults, resourceName) {
  return resourceToNormalizeFn[resourceName](apiResults);
}

function createToApiResults(queryParams) {
  return (apiResults, resourceName) => {
    const pResult = pFetchFromApi(resourceName);
    return fp.set(resourceName, pResult, apiResults);
  };

  // needs access to `qs`
  function pFetchFromApi(resourceName) {
    return (resourceName === 'categories')
      ? requestFromApi.get(resourceName)
      : requestFromApi.get(resourceName, queryParams);
  }
}

function getResourceToNormalizeFn() {
  // each function takes the api result of the resource
  return {
    categories: fp.flow(
      fp.get('categories')
      , fp.map(fp.get('categories'))
    )
    , cuisines: fp.flow(
      fp.get('cuisines')
      , fp.map(toCuisineValueWithNormalizeKeys)
    )
    , establishments: fp.flow(
      fp.get('establishments')
      , fp.map(fp.get('establishment'))
    )
  };
}

function toCuisineValueWithNormalizeKeys({ cuisine }) {
  return uMapKeys(
    (_val, key) => key.slice('cuisine_'.length)
    , cuisine
  );
}

function toTags(allTags, typeVal, typeKey) {
  const eachTagType = getEachTagType(typeKey);

  return fp.reduce(
    eachTagType
    , allTags
    , typeVal
  );
}

function getEachTagType(typeKey) {
  return (allTags, { id, name }) => fp.set(
    [name, typeKey]
    , id
    , allTags
  );
}

function pWriteToApiTags(obj) {
  const contents = JSON.stringify(obj, null, 2);
  return pMkdirp(path.dirname(tagsFilePath))
    .then(() => pFs.writeFile(tagsFilePath, contents))
    ;
}


//---------//
// Exports //
//---------//

module.exports = buildTags;
