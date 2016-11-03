Tech that I'm trying out with this project

So far:

- React
- create-react-app
- Webpack
- Yarn
- React Router

To do:

- Pure functions
- Redux
- CSS Modules
- Travis CI
- ImmutableJS
- Standard
- Docker

Behavior I want to support

- Screen Readers
- Accessibility

Pages I want to show
- CV
- Projects
 - Cloud Chamber

### Crashes:

There is a crash caused by OSX Sierra upgrade. During `npm test` node produces the following error. `Error: Error watching file for changes: EMFILE`.
https://github.com/facebook/jest/issues/1767

The temporary workaround is to install watchman, e.g. `brew install watchman`. Once the issue is resolved in watchman, remove this requirement.
