import React, { Component } from 'react';
// Redux
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { createUser } from './../../redux/actions/userActions'
class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password1: "",
      password2: "",
      errors: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      console.log(this.props)
    }
  }

  handleInput = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  submitForm = (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (this.state.password1 !== this.state.password2) {
      // If the passwords dont match, alert the user
      alert("Passwords do not match")
    }
    else {
      // If the passwords match, submit the form using a redux action
      this.props.createUser({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password1
      })

    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <span>First Name</span>
          <br />
          <input name="firstName" placeholder="Your First Name" onChange={this.handleInput} value={this.state.firstName} required />
          <br />
          <span>Last Name</span>
          <br />
          <input name="lastName" placeholder="Your Last Name" onChange={this.handleInput} value={this.state.lastName} required />
          <br />
          <span>Email</span>
          <br />
          <input name="email" placeholder="Your Email" onChange={this.handleInput} value={this.state.email} required />
          <br />
          <span>Your Password</span>
          <br />
          <input type="password" name="password1" placeholder="Your password" onChange={this.handleInput} value={this.state.password1} required />
          <br />
          <span>Confirm Password</span>
          <br />
          <input type="password" name="password2" placeholder="Confirm your Password" onChange={this.handleInput} value={this.state.password2} required />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

// export default SignupPage;
SignupPage.propTypes = {
  user: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  { createUser }
)(SignupPage);