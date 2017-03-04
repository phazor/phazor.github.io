import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../../actions'

let AddUser = ({ dispatch }) => {
  let input = '';

  return (<div className="InputArea">
    <input type="text" autoFocus placeholder="e.g. Mary Jane" ref={node => { input = node; }}></input>
    <button onClick={() => {
      dispatch(addUser(input.value));
      input.value = '';
      input.focus();
    }}>Go!</button>
  </div>)
};

AddUser = connect()(AddUser);

export default AddUser;
