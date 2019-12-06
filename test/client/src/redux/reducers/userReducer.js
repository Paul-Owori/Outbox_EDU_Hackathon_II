// I've made a file called userReducer.js in the reducer folder

import { CREATE_USER, UPDATE_USER, DELETE_USER, FETCH_USER, FETCH_ALL_USERS, LOGIN_USER, LOADING_USERS, LOGOUT_USER } from './../types/userTypes'

const initialState = {
  users: [],
  user: {},
  statusMsgs: [],
  token: "",
  loading: false,
  loggedIn: false
};

export default function (state = initialState, action) {

  switch (action.type) {

    // This sorts through the response fromm the backend and stores the results from any attempt to create a user in the state
    case CREATE_USER:
      return {
        ...state,
        loading: false,
        statusMsgs: [...state.statusMsgs, {
          subject: CREATE_USER,
          timeStamp: new Date(),
          status: action.payload.status,
          message: action.payload.message,
        }]

      }

    // This sorts through the response fromm the backend and stores the user in the state
    case FETCH_USER:
      return {
        ...state,
        loading: false,
        user: action.payload.result,
        statusMsgs: [...state.statusMsgs, {
          subject: FETCH_USER,
          timeStamp: new Date(),
          status: action.payload.status,
          message: action.payload.message,
        }]
      }

    // This sorts through the response fromm the backend and saves all the users received in the state
    case FETCH_ALL_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload.result,
        statusMsgs: [...state.statusMsgs, {
          subject: FETCH_USER,
          timeStamp: new Date(),
          status: action.payload.status,
          message: action.payload.message,
        }]
      }

    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        statusMsgs: [...state.statusMsgs, {
          subject: UPDATE_USER,
          timeStamp: new Date(),
          status: action.payload.status,
          message: action.payload.message,
        }]

      }

    case DELETE_USER:
      return {
        ...state,
        loading: false,
        statusMsgs: [...state.statusMsgs, {
          subject: DELETE_USER,
          timeStamp: new Date(),
          status: action.payload.status,
          message: action.payload.message,
        }]
      }

    case LOGIN_USER:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        statusMsgs: [...state.statusMsgs, {
          subject: LOGIN_USER,
          timeStamp: new Date(),
          status: action.payload.status,
          message: action.payload.message,
        }]
      }

    case LOGOUT_USER:
      return {
        ...state,
        loading: false,
        token: "",
        statusMsgs: [...state.statusMsgs, {
          subject: LOGOUT_USER,
          timeStamp: new Date(),
          status: 200,
          message: `Logout was successful`,
        }]
      }

    case LOADING_USERS:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}