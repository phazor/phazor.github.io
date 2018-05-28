import * as actions from './index';

it('should create addUser actions', () => {
  const expected = {
    type: 'ADD_USER',
    name: 'Test User',
    index: 0
  }

  const result = actions.addUser('Test User')

  expect(result).toEqual(expected);
});
