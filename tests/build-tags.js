'use strict';


//-------------------//
// Instantiate Mocks //
//-------------------//

const mockRequire = require('mock-require')
  , mockRequestFromApi = require('./mock/request-from-api')
  ;

mockRequire('../lib/request-from-api', mockRequestFromApi);


//---------//
// Imports //
//---------//

const pify = require('pify');

const buildTags = require('../tasks/build-tags')
  , chai = require('chai')
  , chaiAsPromised = require('chai-as-promised')
  , expected = require('./expected/build-tags')
  , path = require('path')
  , pFs = pify(require('fs'))
  ;


//------//
// Init //
//------//

chai.use(chaiAsPromised);
chai.should();

const parseJson = str => JSON.parse(str)
  , tagsFile = path.join(__dirname, '../lib/api/tags.json')
  ;


//------//
// Main //
//------//

test('build-tags', () => {
  return buildTags()
    .then(() => pFs.readFile(tagsFile, 'utf8'))
    .then(parseJson)
    .should.eventually.deep.equal(expected)
    ;
});
