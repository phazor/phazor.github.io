import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../../actions'

let AddUser = ({ handleClick }) => {
  let input = '';
  return (<div className="InputArea">
    <input type="text" autoFocus placeholder="e.g. Mary Jane" ref={node => { input = node; }}></input>
    <button onClick={() => {
      handleClick(input.value);
      input.value = '';
      input.focus();
    }}>Go!</button>
  </div>)
};

const mapDispatchToProps = (dispatch) => ({
  handleClick: (value) => {
    dispatch(addUser(value))
  }
})

AddUser = connect(undefined, mapDispatchToProps)(AddUser);

export default AddUser;
