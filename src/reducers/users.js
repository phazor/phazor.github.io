const initialState = {
  testField: 'hello hello hello',
  userList :
  [{
    name: 'Tristan',
    index: 0
  },{
    name: 'Ali',
    index: 1
  },{
    name: 'Snoopy',
    index: 2
  }]
}

const user = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        name: action.name,
        index: action.index
      }

    default:
      return state;
  }
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        userList: [
          ...state.userList,
          user(undefined, action)
        ]
      }

    default:
      return state;
  }
}

export default users;
