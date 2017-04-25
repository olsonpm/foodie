'use strict';


//---------//
// Imports //
//---------//

const axios = require('axios')
  , fp = require('lodash/fp')
  , packageJson = require('../../package')
  , querystring = require('querystring')
  ;


//------//
// Init //
//------//

const { apiKey, apiUrl } = packageJson.zomato
  , axiosInstance = axios.create({
    baseURL: apiUrl
    , headers: {
      'user-key': apiKey
    }
    , timeout: 3000 // arbitrary
  })
  ;


//------//
// Main //
//------//

const requestFromApi = {
  get: (restOfUrl, obj) => {
    const qs = querystring.stringify(obj);
    return axiosInstance.get(`${restOfUrl}?${qs}`)
      .then(fp.get('data'))
      ;
  }
};


//---------//
// Exports //
//---------//

module.exports = requestFromApi;
