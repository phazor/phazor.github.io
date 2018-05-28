let userIndex = 0;
export const addUser = (name) => {
  return {
    type: 'ADD_USER',
    name: name,
    index: userIndex++
  }
}
