import React, { Component } from 'react';

// Components imports
import LoginPage from './../signup_components/LoginPage';
import SignupPage from './../signup_components/SignupPage'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPageVisibility: false
    }
  }

  toggleVisibility = () => {
    this.setState({
      loginPageVisibility: !this.state.loginPageVisibility
    })
  }



  render() {
    return (
      <div>
        <h1>Welcome</h1>


        {this.state.loginPageVisibility ?
          <React.Fragment>
            <h4>Login Below</h4>
            <LoginPage />
            <h5 onClick={this.toggleVisibility}>
              Dont have an account? Click here to signup instead
            </h5>
          </React.Fragment>
          :
          <React.Fragment>
            <h4>Signup Below</h4>
            <SignupPage />
            <h5 onClick={this.toggleVisibility}>
              Already have an account? Click here to login instead
            </h5>
          </React.Fragment>}

      </div>
    );
  }
}

export default HomePage;
