'use strict';


//---------//
// Imports //
//---------//

const axios = require('axios')
  , chalk = require('chalk')
  , tinyLr = require('tiny-lr')
  ;

const { log } = require('../utils');


//------//
// Init //
//------//

const highlight = chalk.green
  , lrPort = 35730
  , axiosInstance = axios.create({
    baseURL: `http://localhost:${lrPort}/changed?files=`
  })
  ;


//------//
// Main //
//------//

module.exports = {
  get: files => axiosInstance.get(files)
  , startServer: () => {
    tinyLr().listen(lrPort, () => {
      log(`live-reload listening on port ${highlight(lrPort)}`);
    });
  }
};
