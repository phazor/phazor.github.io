import { connect } from 'react-redux'
import UserList from '../components/UserList/UserList'

const mapStateToProps = (state) => {
  return {
    users: state.users.userList
  };
};

const VisibleUserList = connect(
  mapStateToProps
)(UserList);

export default VisibleUserList;
