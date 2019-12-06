import { CREATE_USER, UPDATE_USER, DELETE_USER, FETCH_USER, FETCH_ALL_USERS, LOGIN_USER, LOADING_USERS, LOGOUT_USER } from './../types/userTypes';

// Function for loading users
export const usersLoading = () => {
  return { type: LOADING_USERS }

}

// Function for creating a new user
export const createUser = user => dispatch => {
  dispatch(usersLoading);

  fetch(`/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then((result) => {
      dispatch({ type: CREATE_USER, payload: result });
    })
    .catch(error => {
      let message = `An error occurred creating a new user`

      console.error(message, error);

      dispatch({
        type: CREATE_USER, payload: {
          status: 500,
          message,
        }
      });

    })



}

// Function for updating a user
export const updateUser = (updateDetails, userID) => dispatch => {
  dispatch(usersLoading);

  fetch(`/users/${userID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updateDetails)
  })
    .then(res => res.json())
    .then((result) => {
      dispatch({ type: UPDATE_USER, payload: result });
    })
    .catch(error => {
      let message = `An error occurred updating the user`

      console.error(message, error);

      dispatch({
        type: UPDATE_USER, payload: {
          status: 500,
          message,
        }
      });
    })
}


// Function for deleting a user
export const deleteUser = (userID) => dispatch => {
  dispatch(usersLoading);

  fetch(`/users/${userID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then((result) => {
      dispatch({ type: DELETE_USER, payload: result });
    })
    .catch(error => {
      let message = `An error occurred deleting the user`

      console.error(message, error);

      dispatch({
        type: DELETE_USER, payload: {
          status: 500,
          message,
        }
      });
    })
}



// Function for fetching a user
export const fetchUser = (userID) => dispatch => {
  dispatch(usersLoading);

  fetch(`/users/${userID}`)
    .then(res => res.json())
    .then((result) => {
      dispatch({ type: FETCH_USER, payload: result });
    })
    .catch(error => {
      let message = `An error occurred fetching the user`

      console.error(message, error);

      dispatch({
        type: FETCH_USER, payload: {
          status: 500,
          message,
        }
      });
    })
}

// Function for fetching all users
export const fetchAllUsers = () => dispatch => {
  dispatch(usersLoading);

  fetch(`/users`)
    .then(res => res.json())
    .then((result) => {
      dispatch({ type: FETCH_ALL_USERS, payload: result });
    })
    .catch(error => {
      let message = `An error occurred fetching all users`

      console.error(message, error);

      dispatch({
        type: FETCH_ALL_USERS, payload: {
          status: 500,
          message,
        }
      });
    })
}

// Function for logging in a user
export const loginUser = (userDetails) => dispatch => {
  dispatch(usersLoading);

  fetch(`/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userDetails)
  })
    .then(res => res.json())
    .then((result) => {
      let { token } = result

      sessionStorage.setItem("token", JSON.stringify(token));

      dispatch({ type: LOGIN_USER, payload: result });
    })
    .catch(error => {
      let message = `An error occurred logging in the user`

      console.error(message, error);

      dispatch({
        type: LOGIN_USER, payload: {
          status: 500,
          message,
        }
      });

    })

}

// Function for logging out a user
export const logoutUser = () => dispatch => {
  dispatch(usersLoading);
  sessionStorage.removeItem("token")
  dispatch({ type: LOGOUT_USER });
}



