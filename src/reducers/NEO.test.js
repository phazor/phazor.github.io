import reducer from './NEO'

it('reducer keeps state with no action', () => {
  let state = reducer({ test: 'Test' }, {});
  
  expect(state.test).toEqual('Test');
});

it('reducer honors initial state when no state is passed in', () => {
  let state = reducer(undefined, {});

  expect(state.lastAction).toEqual('NONE');
});

it('reducer applies lastAction upon fetch request', () => {
  let state = reducer({}, { type: 'FETCH_NEO_REQUEST' });

  expect(state.lastAction).toEqual('FETCH_NEO_REQUEST');
});

it('reducer applies lastAction upon fetch success', () => {
  let state = reducer({}, { type: 'FETCH_NEO_SUCCESS' });

  expect(state.lastAction).toEqual('FETCH_NEO_SUCCESS');
});

it('reducer applies lastAction and reason upon fetch failure', () => {
  let state = reducer({}, {
    type: 'FETCH_NEO_FAILURE',
    reason: { stack: "Error: 404" }
  });

  expect(state.lastAction).toEqual('FETCH_NEO_FAILURE');
  expect(state.reason).toEqual('Error: 404');
});
