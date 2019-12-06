import express from 'express';

// Import JWT Handlers
import { verifyToken, retrieveToken } from './../utilities/jwtHandlers'

// Import controllers
import { createUser, updateUserByID, deleteUser, fetchAllUsers, fetchSingleUser, loginUser } from './../controllers/userController'

const { Router } = express;
let router = Router()

// Fetch all users (Unprotected Endpoint)
router.get('/', fetchAllUsers);

// Fetch a single user (Unprotected Endpoint)
router.get('/:userID', fetchSingleUser);

// Create a user (Unprotected Endpoint)
router.post('/', createUser);

// Login a user (Unprotected Endpoint)
router.post('/login', loginUser);

// Update a user (JWT Protected Endpoint)
router.patch('/', retrieveToken, (req, res) => {
  verifyToken(req.token)
    .then((authData) => {
      // authData is available if needed
      // If the authentication fails,
      if (authData === 403) {
        res.status(403).json({
          status: 403,
          message: 'Invalid credentials',
        });
        return;
      }
      // Otherwise if the authentication was successful, proceed with the update
      updateUserByID(req, res)
    })
});


// Delete a user (JWT Protected Endpoint)
router.delete('/', retrieveToken, (req, res) => {
  verifyToken(req.token)
    .then((authData) => {
      // authData is available if needed
      // If the authentication fails,
      if (authData === 403) {
        res.status(403).json({
          status: 403,
          message: 'Invalid credentials',
        });
        return;
      }
      // Otherwise if the authentication was successful, proceed with the update
      deleteUser(req, res)
    })
})

export default router