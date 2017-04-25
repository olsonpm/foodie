'use strict';


//---------//
// Imports //
//---------//

const $ = require('domtastic')
  , delay = require('delay')
  , fp = require('lodash/fp')
  ;


//------//
// Init //
//------//

// this should be in sync with _variables.scss
const animationDuration = 400
  , timeBetweenNotifications = 500
  , notifyWrapper = $('#notify-wrapper')
  , content = notifyWrapper.children('.content').first()
  , notifyDurationMs = 3000
  ;

let notificationQueue = Promise.resolve();


//------//
// Main //
//------//

const notify = ({ message, polarity }) => {
  notificationQueue = notificationQueue.then(() => {
      notifyWrapper.removeClass('hidden');
      content.text(message)
        .addClass(`enter ${polarity}`);

      return delay(notifyDurationMs);
    })
    .then(() => {
      content.addClass('exit');
      return delay(animationDuration);
    })
    .then(() => {
      notifyWrapper.addClass('hidden');
      content.removeClass(`enter exit ${polarity}`);
      return delay(timeBetweenNotifications);
    });
};


//---------//
// Exports //
//---------//

module.exports = notify;
