import PerformanceTracker from './PerformanceTracker';

// Runs a function x times
const runX = (func, n_times, value) => {
  Array(n_times).fill('').forEach(() => func(value))
}

it('can be set up without errors', () => {
  const spy = spyOn(console, 'log');
  let tracker = PerformanceTracker();

  tracker(1);

  expect(spy.calls.any()).toEqual(false);
});

it('prints after 60th input', () => {
  const spy = spyOn(console, 'log');
  let tracker = PerformanceTracker();

  // Run the tracker 60 times
  runX(tracker, 60, 1)

  expect(spy.calls.any()).toEqual(true);
});

it('does not print after 59th input', () => {
  const spy = spyOn(console, 'log');
  let tracker = PerformanceTracker();

  // Run the tracker 60 times
  runX(tracker, 59, 1)

  expect(spy.calls.any()).toEqual(false);
});

it('ignores non-number values', () => {
  const spy = spyOn(console, 'log');
  let tracker = PerformanceTracker();

  runX(tracker, 60, '1')

  expect(spy.calls.any()).toEqual(false);
});
