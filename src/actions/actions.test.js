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

it('should create NEO fetch actions', () => {
  const expected_fetchNEO_Request = {
    type: 'FETCH_NEO_REQUEST'
  }
  const expected_fetchNEO_Failure = {
    type: 'FETCH_NEO_FAILURE',
    reason: 'Test Reason'
  }
  const expected_fetchNEO_Success = {
    type: 'FETCH_NEO_SUCCESS',
    response: 'Test Response'
  }

  const result_fetchNEO_Request = actions.fetchNEO_Request();
  const result_fetchNEO_Failure = actions.fetchNEO_Failure('Test Reason');
  const result_fetchNEO_Success = actions.fetchNEO_Success('Test Response');

  expect(result_fetchNEO_Request).toEqual(expected_fetchNEO_Request);
  expect(result_fetchNEO_Failure).toEqual(expected_fetchNEO_Failure);
  expect(result_fetchNEO_Success).toEqual(expected_fetchNEO_Success);
});

it('fetchNEO should create a function', () => {
  let fetchNEO = actions.fetchNEO();
  expect(fetchNEO instanceof Function).toEqual(true);
});
