// Prints performance data to the console.
// Compares to an `ideal` 60fps performance.
//
// Returns:
//   % thread time spent in loop averaged over the last second
//   # frame skips per second
//   longest frame per second
//
// Usage:
// 1. Initialize with `new performanceTracker()`
// 2. use performance.now() for recording start and end times
// 3. call tracker with the result of `end` - `start`
//
// e.g:
//
// const tracker = PerformanceTracker()
// 60fpsLoop {
//   let start = performance.now()
//   doSomething()
//   let end = performance.now()
//   tracker(end - start)
// }
const PerformanceTracker = () => {
  let values = [];
  // Expects value in milliseconds
  return function(value) {
    if (typeof value === 'number') {
      values.push(value);
    }
    if (values.length === 60) {
      let average = values.reduce((a, b) => (a + b)) / values.length;
      console.log(`average execution time: ${100 * (average * 60) / 1000}%`)
      console.log(`frame skips: ${values.filter((a) => (a > (1000 / 60))).length}`);
      console.log(`longest frame: ${values.reduce((a, b) => (a > b ? a : b))}ms`)
      values = [];
    }
  }
}

export default PerformanceTracker;
