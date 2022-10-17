'use strict';

module.exports = function(settings, trigger) {
  var targetScrollDepth = settings.scrollDepth || 50; // percent of page height
  var targetTimeSpent = settings.timeSpent || 30; // in seconds
  var initDelay = settings.initDelay || 100; // in milliseconds

  // keep track of state
  var state = {
    'targetScrollDepthReached': false,
    'targetTimeSpentReached': false,
    'hasTriggered': false
  }
  // add global state
  // point is to make sure that a "lower" trigger will never fire after a "higher" trigger
  // such as 50% fireng first, then 25% afterwards
  _satellite._ags055 = _satellite._ags055 || {};
  var globalState = _satellite._ags055;
  // so, we'll keep track of the lowest trigger that has fired, so far
  globalState.lowestAllowedToFire = globalState.lowestAllowedToFire || -1;

  // create listeners
  // listener 1 - time spent
  setTimeout( function() {
    state.targetTimeSpentReached = true;
    if (state.targetScrollDepthReached) {
      if (state.hasTriggered === false || settings.fireOnce === false) {
        state.hasTriggered = true;
        // check global state to see if we're allowed to trigger
        if (globalState.lowestAllowedToFire < targetScrollDepth) {
          // record for global state
          globalState.lowestAllowedToFire = targetScrollDepth;
          // BTW, this test has to happen here (on the time trigger), too,
          // in case the scroll depth trigger has already fired, before!
          // We want to avoid out of order events.
          // now trigger
          trigger({
            "subType": "timeSpent"
          });
        }
      }
    }
  }, targetTimeSpent * 1000);

  // listener 2 - scroll depth
  setTimeout( function() {
    try {
      var document = require('@adobe/reactor-document');
      var h1 = 0, h2 = 0;
      if ('undefined' !== typeof document.documentElement && document.documentElement) {
        h1 = Math.max(
          document.documentElement["clientHeight"],
          document.documentElement["scrollHeight"],
          document.documentElement["offsetHeight"]
        );
      }
      if ('undefined' !== typeof document.body && document.body) {
        h2 = Math.max(
          document.body["scrollHeight"],
          document.body["offsetHeight"]
        );
      }
      var pageHeightInPixels = Math.max(h1, h2);
      var window = require('@adobe/reactor-window');
      var viewportHeightInPixels = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      if (viewportHeightInPixels >= pageHeightInPixels) {
        // no scrolling on this short page
        state.targetScrollDepthReached = settings.fireOnShortPages;
      } else {
        // create a listener for scrolling
        var targetScrollDepthInPixels = (pageHeightInPixels - viewportHeightInPixels) * targetScrollDepth / 100;
        window.addEventListener('scroll', function(e) {
          try {
            var currentScrollDepthInPixels = document.documentElement.scrollTop;
            if (currentScrollDepthInPixels >= targetScrollDepthInPixels) {
              state.targetScrollDepthReached = true;
              if (state.targetTimeSpentReached) {
                if (state.hasTriggered === false || settings.fireOnce === false) {
                  state.hasTriggered = true;
                  // check global state to see if we're allowed to trigger
                  // we want to avoid out of order events
                  if (globalState.lowestAllowedToFire < targetScrollDepth) {
                    // record for global state
                    globalState.lowestAllowedToFire = targetScrollDepth;
                    // now trigger
                    trigger({
                      "subType": "scrollDepth",
                      // set the targetScrollDepth in the event
                      // so that it can be used with a Rule's conditions and actions
                      "scrollDepth": targetScrollDepth
                    });
                  }
                }
              }
            }
          } catch(e2) {
          }
        });
      }
    } catch(e) {
    }
  }, initDelay);
};
