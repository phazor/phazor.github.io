[![Build Status](https://travis-ci.org/phazor/phazor.github.io.svg?branch=src)](https://travis-ci.org/phazor/phazor.github.io)

Tech that I'm trying out with this project

So far:

- React
- create-react-app
- Webpack
- Yarn
- React Router
- Travis CI
- Redux
- fetch
- WebGL
- Pure functions

To do:

- WebAssembly
- Preact
- async await
- CSS Modules
- ImmutableJS
- Standard / Prettier
- Docker?

Behavior I want to support

- Fully Responsive
- Screen Readers
- Accessibility
- Legacy Browsers

Pages I want to show
- CV
- Projects
 - Cloud Chamber
 - Trappist-1 planetary model
 - React/Redux Stateful showcase (UserList?)

### Crashes:

There is a crash caused by OSX Sierra upgrade. During `npm test` node produces the following error. `Error: Error watching file for changes: EMFILE`.
https://github.com/facebook/jest/issues/1767

The temporary workaround is to install watchman, e.g. `brew install watchman`. Once the issue is resolved in watchman, remove this requirement.
