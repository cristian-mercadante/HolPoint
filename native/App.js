import React, { Component } from "react";
import AppNavigationContainer from "./AppNavigationContainer";
import rootReducer from "./reducers/index";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import { DARK_YELLOW } from "./colors";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};
const store = createStore(rootReducer, initialState, composeEnhances(applyMiddleware(thunk)));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor={DARK_YELLOW} />
        <AppNavigationContainer />
      </Provider>
    );
  }
}

export default App;
