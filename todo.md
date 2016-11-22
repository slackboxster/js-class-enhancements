
* convert `@FullInject` to just detect normal injects.
* convert `@Constructor` to simply replace `constructor() {`
* convert `@ClasspathImport` to simply replace `_import` (unless there's a way to just use import and detect that specific type).
* change `_classpath.js` to `_package.js`
* refactor `moduleTree` to remain within `classpathBuilder`
* publish to npm registry
* refactor generally
* make things not depend on unix paths
