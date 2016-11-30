# Javascript dependency injection and packaging preprocessor.

Using ESNext in an aurelia app is pretty great, but there is still some unnecessary boilerplate. This plugin gives some preprocessing methods to add to your gulp build process that clean up this boilerplate.

## Installation

**TODO: publish to npm so that this is possible...**
`npm install js-class-enhancements`

add something like this to your gulp build:
`var jsClassEnhancements = require('js-class-enhancements');`
and:
`.pipe(jsClassEnhancements())`

## Import Enhancements

To replace a complicated import like:
`import {Router} from '../../../blaa/thing/router.js'`
use:
`Import blaa.thing.router.Router`

You can import all the classes underneath a directory by:
`Import blaa.thing.*`


## Dependency Injection

Instead of adding a constructor with parameters, just use the inject annotation. The preprocessor will add the inject to an existing constructor.
(So if you don't have anything happening in the constructor, make sure to leave an empty one so the preprocessor knows where to inject the new one. If you have other code in your constructor, it will remain after the preprocessor injected code. Only parameterless constructors can receive this auto injection code).
`@inject(Router, EventAggregator)`
will generate:

    constructor(Router, EventAggregator) {
        this.router = Router;
        this.eventAggregator = EventAggregator;

The assumption is that any constructor into which you will be injecting dependencies is not going to have any additional parameters. A further assumption is that if your constructor is empty, it is still present. The benefit of this is that the plugin doesn't need to do a lot of work to figure out where the constructor goes, and any additional constructor code (including code that references the injected variables) can be added by the user while using this plugin.

To explain all that, look at these examples:

### Empty Constructor

This source:

    @inject(Router, EventAggregator)
    class Thing {
        constructor() {
        }
    }

Becomes this:

    @inject(Router, EventAggregator)
    class Thing {
        constructor(Router, EventAggregator) {
            this.router = Router;
            this.eventAggregator = EventAggregator;
        }
    }
    
### But I want to do things in my constructor:

This source:

    @inject(Router, EventAggregator)
    class Thing {
        constructor() {
            this.router.navigateBack(); // this code will be preserved.
        }
    }

Becomes this:

    @inject(Router, EventAggregator)
    class Thing {
        constructor(Router, EventAggregator) {
            this.router = Router;
            this.eventAggregator = EventAggregator;
            this.router.navigateBack(); // this code will be preserved
        }
    }
    
### Additional arguments don't work


This source:

    @inject(Router, EventAggregator)
    class Thing {
        constructor(myStringArg) {
            this.string = myStringArg
        }
    }

Becomes this:

    @inject(Router, EventAggregator)
    class Thing {
        constructor(myStringArg) {
            this.string = myStringArg
        }
    }
    
 In this situation you will have to manually add the arguments for your injects. If this is a severe limitation, add a pull request. This is a very simple library. I'd love the contribution.
