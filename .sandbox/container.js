module.exports = {
  "dataElements": {
    "foo": {
      "modulePath": "sandbox/localStorage.js",
      "settings": {
        "name": "foo"
      },
      "cleanText": true,
      "defaultValue": "bar"
    }
  },
  "rules": [{
    "id": "RL1540473749765",
    "name": "TestRule",
    "events": [{
      "modulePath": "time-spent-and-scroll-depth-combined-event/src/lib/events/combinedTimeSpentAndScrollDepth.js",
      "settings": {
        "timeSpent": "10",
        "scrollDepth": "50",
        "fireOnce": true
      }
    }]
  }],
  "extensions": {},
  "property": {
    "settings": {
      "domains": ["jan-exner.de"]
    }
  },
  "buildInfo": {
    "turbineVersion": "25.1.3",
    "turbineBuildDate": "2018-10-25T13:22:31.932Z",
    "buildDate": "2018-10-25T13:22:31.932Z",
    "environment": "development"
  }
}