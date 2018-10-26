'use strict';

module.exports = function(settings, trigger) {
  // TODO Start watching for an event. Call trigger when the event occurs.
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
        trigger();
      }
    }
  }, targetTimeSpent * 1000);

  // listener 2 - scroll depth
  var pageHeightInPixels = Math.max(
    document.documentElement["clientHeight"],
    document.body["scrollHeight"],
    document.documentElement["scrollHeight"],
    document.body["offsetHeight"],
    document.documentElement["offsetHeight"]
  );
  var targetScrollDepthInPixels = pageHeightInPixels * targetScrollDepth / 100;
  window.onscroll = function(e) {
    var currentScrollDepthInPixels = document.documentElement.scrollTop;
    if (currentScrollDepthInPixels >= targetScrollDepthInPixels) {
      state.targetScrollDepthReached = true;
      if (state.targetTimeSpentReached) {
        if (state.hasTriggered === false || settings.fireOnce === false) {
          state.hasTriggered = true;
          trigger();
        }
      }
    }
  }
};
