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
