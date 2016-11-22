
* convert `@FullInject` to just detect normal injects.
* convert `@Constructor` to simply replace `constructor() {`
* convert `@ClasspathImport` to simply replace `_import` (unless there's a way to just use import and detect that specific type).
* change `_classpath.js` to `_package.js`
* publish to npm registry
* `npm install --save` to both client applications
* use everything fully within ui-components and app
* refactor `moduleTree` to remain within `classpathBuilder`
* refactor generally
* make things not depend on unix paths

