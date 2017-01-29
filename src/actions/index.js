let userIndex = 3; // See initial state in src/reducers/users.js
export const addUser = (name) => {
  return {
    type: 'ADD_USER',
    name: name,
    index: userIndex++
  }
}
