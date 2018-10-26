'use strict';

module.exports = function(settings, trigger) {
  var targetScrollDepth = settings.scrollDepth || 50; // percent of page height
  var targetTimeSpent = settings.timeSpent || 30; // in seconds

  // keep track of state
  var state = {
    'targetScrollDepthReached': false,
    'targetTimeSpentReached': false,
    'hasTriggered': false
  }

  // create listeners
  // listener 1 - time spent
  setTimeout( function() {
    state.targetTimeSpentReached = true;
    if (state.targetScrollDepthReached) {
      if (state.hasTriggered === false || settings.fireOnce === false) {
        state.hasTriggered = true;
        trigger({
          "subType": "timeSpent"
        });
      }
    }
  }, targetTimeSpent * 1000);

  try {
    // listener 2 - scroll depth
    var pageHeightInPixels = Math.max(
      document.documentElement["clientHeight"],
      document.body["scrollHeight"],
      document.documentElement["scrollHeight"],
      document.body["offsetHeight"],
      document.documentElement["offsetHeight"]
    );
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
                trigger({
                  "subType": "scrollDepth"
                });
              }
            }
          }
        } catch(e2) {}
      });
    }
  } catch(e) {}
};
