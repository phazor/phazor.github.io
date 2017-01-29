import React, { PropTypes } from 'react';

const UserList = ({ users }) => (
  <div className="ListContainer">
    <ul>
      { users.map((user) => <li key={user.index}>{user.name}</li>) }
    </ul>
  </div>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
};

export default UserList;
