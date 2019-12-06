import React, { Component } from 'react';

// Redux
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { loginUser } from './../../redux/actions/userActions'


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      console.log(this.props)
    }
  }

  handleInput = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  submitForm = (e) => {
    e.preventDefault();
    // Login the user using the form
    this.props.loginUser({
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <span>Email</span>
          <br />
          <input type="text" name="email" value={this.state.email} onChange={this.handleInput} placeholder="Your email address" required />
          <br />
          <span>Password</span>
          <br />
          <input type="password" name="password" placeholder="Your password" onChange={this.handleInput} value={this.state.password} required />
          <br />
          <button type="submit">Submit</button>
        </form>

      </div>
    );
  }
}

// Subscribe the component to redux
LoginPage.propTypes = {
  user: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  { loginUser }
)(LoginPage);