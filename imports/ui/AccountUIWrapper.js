import React from "react";
import ReactDOM from "react-dom";
import { Template } from 'meteor/templating';
import Blaze from 'meteor/gadicc:blaze-react-component';

class AccountUIWrapper extends React.Component {

  render() {
    return (
      <div className="account-btn">
        <Blaze template="loginButtons" align="center" />
      </div>
    );
  }
}

export default AccountUIWrapper;
