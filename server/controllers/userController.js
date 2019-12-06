// Packages
import mongoose from 'mongoose';
import User from "./../models/User"
import { createToken } from './../utilities/jwtHandlers'

// Create a user
export const createUser = (req, res) => {

  // Get the content from the request and use that to create a new User
  let content = req.body;
  let newUser = new User({
    ...content
  })

  // The password from the content was also saved, but we dont need it as plain text, so we remove it
  delete newUser.password;

  // We then set the password the correct way using the user schema method of set password
  newUser.setPassword(content.password);

  // Save the new user to the database
  newUser.save()
    .then(result => {
      res.status(201).json({
        status: 201,
        message: `User successfully created.`,
        result
      })
    })
    .catch(error => {
      let message = `There was an error saving the User`;
      console.error(message, error);

      res.status(500).json({
        message,
        error,
        status: 500
      })
    })
}


// Update user 
export const updateUserByID = (req, res) => {

  let { userID } = req.params

  let updateOps = req.body.updateDetails;

  // Update the user
  User.updateMany({ _id: userID }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        status: 200,
        message: `User Update was successful`,
        result: result
      });
    })
    .catch(err => {

      let message = `User Update failed`
      console.error(message, err)
      res.status(500).json({
        status: 500,
        message: message,
        error: err
      });
    });
}


// Delete a user 
export const deleteUser = (req, res) => {
  let { userID } = req.params

  User.deleteOne({ _id: userID })
    .exec()
    .then(result => {
      res.status(200).json({
        status: 200,
        message: `User with id ${userID} successfully deleted.`,
        result
      });
    })
    .catch(error => {

      let message = `There was an error deleting User with ID ${userID}.`
      console.error(error, message)

      res.status(500).json({
        status: 500,
        message,
        error
      });
    });
}

// Fetch all users
export const fetchAllUsers = (req, res) => {

  User.find()
    .then(results => {
      if (results && results.length) {
        res.status(200).json({
          status: 200,
          message: `Users found.`,
          results
        });
      } else {
        res.status(404).json({
          status: 404,
          message: `No Users found.`,
        });
      }
    })
    .catch(error => {
      let message = `There was an error fetching all Users from the database`;
      console.error(message, error);

      res.status(500).json({
        message,
        error,
        status: 500
      })
    })
}


// Fetch a single user
export const fetchSingleUser = (req, res) => {

  let { userID } = req.params;

  User.findOne({ _id: userID })
    .then(result => {
      if (result) {
        res.status(200).json({
          status: 200,
          message: `User with ID: ${userID} was found.`,
          result
        });
      } else {
        res.status(404).json({
          status: 404,
          message: `No User found with that ID (${userID})`,
        });
      }
    })
    .catch(error => {

      let message = `There was an error fetching the User with ID: ${userID} from the database`;
      console.error(message, error);
      res.status(500).json({
        message,
        error,
        status: 500
      })
    })
}

// Login user
export const loginUser = (req, res) => {

  let { email, password } = req.body;

  User.findOne({ email: email })
    .then(userFound => {
      // If a user is found
      if (userFound) {
        let verifyPassword = userFound.validPassword(password);

        // If the password is invalid, reject login
        if (verifyPassword === false) {
          res.status(403).json({
            status: 403,
            message: `Your credentials are invalid`,
          });
        }
        else {
          // If password is valid,
          // Create JSON Web Token using the user found and send that to the frontend
          createToken(userFound)
            .then(token => {
              res.status(200).json({
                message: "Login was successful",
                status: 200,
                token: token
              })
            })
        }
      }
      else {
        // If no user is found
        res.status(404).json({
          status: 404,
          message: `That user does not exist`,
        });
      }
    })
    .catch(error => {

      let message = `There was an error logging in.`;
      console.error(message, error);
      res.status(500).json({
        message,
        error,
        status: 500
      })
    })

}