# Launch Extension "Time and Scroll Event"

Extension for Launch, by Adobe - Provides an Event for measuring the consumption of content.

Inspired by [Simo Ahava](https://www.simoahava.com/analytics/fire-tag-upon-scroll-depth-and-time-spent/), this Extension allows you to build Rules in Launch that fire based on a minimal amount of time spent and a minimum of scolling, combined.

The Event will only fire once *both* conditions are met.

*New in v1.5.0*: events will no longer fire out of order!

In previous versions, it was possible that the Extension could generate a sequence of events like this: 50% > 25%. This is no longer possible. The firing of the 25% event in the example would no longer happen.

*New in v2*: scroll event listener will be a passive listener, see [Lighthouse best practice: use passive event listeners](https://developer.chrome.com/docs/lighthouse/best-practices/uses-passive-event-listeners/).
