import reducer from './users'

it('keeps state with no action', () => {
  let state = reducer({ test: 'Test' }, {});

  expect(state.test).toEqual('Test');
});

it('honors initial state when no state is passed in', () => {
  let state = reducer(undefined, {});

  expect(state).toEqual({ userList: [] });
});

it('creates a user', () => {
  let state = reducer(undefined, {
    type: 'ADD_USER',
    name: 'Test User 1'
  });

  expect(state.userList[0].name).toEqual('Test User 1');
});
