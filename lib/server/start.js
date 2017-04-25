'use strict';


//---------//
// Imports //
//---------//

const pify = require('pify');

const chalk = require('chalk')
  , createRenderBase = require('./create-render-base')
  , fp = require('lodash/fp')
  , Koa = require('koa')
  , KoaRouter = require('koa-router')
  , koaStatic = require('koa-static')
  , liveReloadService = require('./live-reload-service')
  , packageJson = require('../../package')
  , path = require('path')
  , pGaze = pify(require('gaze'))
  , requestFromApi = require('./request-from-api')
  ;

const { log, logErr, uEach } = require('../utils');


//------//
// Init //
//------//

const app = new Koa()
  , highlight = chalk.green
  , port = '8090'
  , tagKeyToQueryKey = {
    category: 'category'
    , establishment: 'establishment_type'
    , cuisine: 'cuisines'
  }
  , staticRoot = path.join(__dirname, '../../dist')
  ;

const { milwaukeeId } = packageJson.zomato;

// this will be set during `startServer`, where the build process will have
//   finished and we can depend on '../api/tags.json' existing
let tagData;


//------//
// Main //
//------//

const startServer = ({ enableLr }) => {
  tagData = require('../api/tags');

  createRenderBase()
    .then(renderBaseTemplate => {
      const renderAccessor = createRenderAccessor(renderBaseTemplate);

      const router = createRouter({
        enableLr
        , renderBase: renderAccessor.renderBase
        , routerInst: new KoaRouter()
      });

      app.use(koaStatic(staticRoot))
        .use(router.routes())
        .use(router.allowedMethods())
        .listen(port)
        ;

      if (enableLr) {
        watchHbs(renderAccessor.update);
      }

      log(`foodie listening on port ${highlight(port)}`);
    })
    .catch(logErr)
    ;
};


//-------------//
// Helper Fxns //
//-------------//

function createRouter({ enableLr, renderBase, routerInst }) {
  routerInst.get('/', ctx => {
    ctx.body = renderBase({ lrIsEnabled: enableLr });
  });

  const defaultSearchParams = {
    entity_id: milwaukeeId
    , entity_type: 'city'
  };
  routerInst.get('/search', ctx => {
    return requestFromApi.get(
        'search'
        , fp.merge(
          defaultSearchParams
          , getSearchQueryObj(ctx.query.tags)
        )
      )
      .then(data => {
        const restaurants = parseRestaurants(data);
        ctx.body = {
          restaurants
          , totalResults: data.results_found
        };
      })
      ;
  });

  return routerInst;
}

function getSearchQueryObj(tags) {
  const initialQueryObj = {
    category: []
    , establishment_type: []
    , cuisines: []
  };

  return fp.flow(
    fp.split(',')
    , fp.reduce(
      (queryObj, aTag) => {
        uEach(
          (id, tagKey) => {
            const queryKey = tagKeyToQueryKey[tagKey];
            queryObj[queryKey].push(id);
          }
          , tagData[aTag]
        );

        return queryObj;
      }
      , initialQueryObj
    )
    , fp.omitBy(fp.isEmpty)
    , truncateEstablishmentsToFirst
    , fp.mapValues(fp.join(','))
  )(tags);
}

//
// TODO
// - Fix this dirty solution to the api's lack of multiple
//   establishment functionality
//
function truncateEstablishmentsToFirst(queryObj) {
  if (!fp.isEmpty(queryObj.establishment_type)) {
    queryObj.establishment_type = [queryObj.establishment_type[0]];
  }
  return queryObj;
}

function watchHbs(updateRenderBase) {
  pGaze(path.join(__dirname, '../hbs/**/*'))
    .then(watcher => {
      watcher.on('all', updateBaseTemplateAndReloadPage);
    })
    .catch(logErr)
    ;

  function updateBaseTemplateAndReloadPage() {
    return createRenderBase()
      .then(renderBase => {
        updateRenderBase(renderBase);

        // we need to reload the page upon any handlebars changes
        return liveReloadService.get('/');
      });
  }
}

function createRenderAccessor(initialRenderBase) {
  let renderBase = initialRenderBase;

  const accessor = {
    renderBase: (...args) => renderBase(...args)
    , update: _renderBase => {
      renderBase = _renderBase;
      return accessor;
    }
  };

  return accessor;
}

function parseRestaurants(data) {
  return fp.flow(
    fp.get('restaurants')
    , fp.map(fp.flow(
      fp.get('restaurant')
      , fp.pick(['name', 'location', 'user_rating', 'url'])
      , changeLocationToAddress
      , changeUserRatingToAggregateAndVotes
    ))
    , fp.sortBy('name')
  )(data);
}

function changeLocationToAddress(obj) {
  // prevents orphaned words
  obj.address = fp.flow(
    fp.split(' ')
    , words => {
      const [lastWord, secondToLastWord] = [words.pop(), words.pop()];
      words.push(secondToLastWord + '&nbsp;' + lastWord);
      return words;
    }
    , fp.join(' ')
  )(obj.location.address);

  delete obj.location;
  return obj;
}

function changeUserRatingToAggregateAndVotes(obj) {
  const rating = obj.user_rating;
  obj.votes = rating.votes;
  obj.aggregate = rating.aggregate_rating;
  delete obj.user_rating;
  return obj;
}


//---------//
// Exports //
//---------//

module.exports = startServer;
