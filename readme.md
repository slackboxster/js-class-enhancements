# Javascript dependency injection and packaging preprocessor.

Using ESNext in an aurelia app is pretty great, but there is still some unnecessary boilerplate. This plugin gives some preprocessing methods to add to your gulp build process that clean up this boilerplate.

## Installation

**TODO: publish to npm so that this is possible...**
`npm install js-class-enhancements`

add something like this to your gulp build:
`var jsClassEnhancements = require('js-class-enhancements');`
and:
`.pipe(jsClassEnhancements())`

## Usage

To replace a complicated import like:
`import {Router} from '../../../blaa/thing/router.js'`
use:
`Import blaa.thing.router.Router`

You can import all the classes underneath a directory by:
`Import blaa.thing.*`


### Dependency Injection

Instead of adding a constructor with parameters, just use the inject annotation. The preprocessor will add the inject to an existing constructor.
(So if you don't have anything happening in the constructor, make sure to leave an empty one so the preprocessor knows where to inject the new one. If you have other code in your constructor, it will remain after the preprocessor injected code. Only parameterless constructors can receive this auto injection code).
`@inject(Router, EventAggregator)`
will generate:
`constructor(Router, EventAggregator) {`
`   this.router = Router;`
`   this.eventAggregator = EventAggregator;`
