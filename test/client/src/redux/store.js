// Import Redux
import { createStore, applyMiddleware, compose } from "redux";

// Import Redux async middeware
import thunk from "redux-thunk";

// Import reducers
import rootReducer from "./reducers/index";

// Initialize store
const initialState = {};

const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  // Setup enhancers
  composeEnhancers(
    applyMiddleware(...middleWare)
  ),
);

export default store;