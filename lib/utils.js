'use strict';


//---------//
// Imports //
//---------//

const fp = require('lodash/fp');


//------//
// Init //
//------//

// this allows me to use 'then' in a functional context, e.g. fp.flow
const then = fp.curry((fn, aPromise) => aPromise.then.call(aPromise, fn));

// allows me to use 'Promise.all' in a functional context
const log = str => { console.log(str); }
  , logErr = err => { console.error(err); }
  , pAll = arr => Promise.all(arr)
  , pProps = getPProps()
  , pResolve = val => Promise.resolve(val)
  , uEach = fp.map.convert({ cap: false })
  , uMap = fp.map.convert({ cap: false })
  , uMapKeys = fp.mapKeys.convert({ cap: false })
  , uMapValues = fp.mapValues.convert({ cap: false })
  , uReduce = fp.reduce.convert({ cap: false })
  ;


//------//
// Main //
//------//

const utils = {
  log, logErr, pAll, pProps, pResolve, then, uEach, uMap, uMapKeys, uMapValues
  , uReduce
};


//-------------//
// Helper Fxns //
//-------------//

function getPProps() {
  // takes an object whose values are promises
  return fp.flow(
    fp.toPairs

    // maps each pair to Promise.all(pair), where the value will be a promise
    , fp.map(pAll)

    // resolves when all pairs are resolved
    , pAll

    // once resolved, transform back from the pairs to the object
    , then(fp.fromPairs)
  );
}


//---------//
// Exports //
//---------//

module.exports = utils;
