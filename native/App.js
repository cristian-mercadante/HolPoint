import React, { Component } from "react";
import AppNavigationContainer from "./AppNavigationContainer";
import rootReducer from "./reducers/index";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};
const store = createStore(rootReducer, initialState, composeEnhances(applyMiddleware(thunk)));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigationContainer />
      </Provider>
    );
  }
}

export default App;
