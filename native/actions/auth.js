import * as actionTypes from "./types";
import axios from "axios";
import { loginURL, signupURL } from "../server";
import * as getCurrentUserActions from "./currentUser";
//import * as alertActions from "./alerts";
import * as friendRequestActions from "./friendRequest";
import { AsyncStorage } from "react-native";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  AsyncStorage.removeItem("token");
  AsyncStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

const checkAuthTimeout = expirationTime => {
  return dispatch => {
    authLogout();
  };
};

const headers = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    // we return the promise in order to use wait till the end using "then"
    return axios
      .post(
        loginURL,
        {
          username: username,
          password: password
        },
        headers
      )
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        AsyncStorage.setItem("token", String(token));
        AsyncStorage.setItem("expirationDate", String(expirationDate));
        dispatch(authSuccess(token));
        dispatch(getCurrentUserActions.getCurrentUser());
        dispatch(friendRequestActions.loadRequests());
        dispatch(checkAuthTimeout(3600));
      })
      .catch(error => {
        dispatch(authFail(error));
        //dispatch(alertActions.error(error));
        return error;
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    // we return the promise in order to use wait till the end using "then"
    return axios
      .post(
        signupURL,
        {
          username: username,
          email: email,
          password1: password1,
          password2: password2
        },
        headers
      )
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        AsyncStorage.setItem("token", String(token));
        AsyncStorage.setItem("expirationDate", String(expirationDate));
        dispatch(authSuccess(token));
        dispatch(getCurrentUserActions.getCurrentUser());
        dispatch(friendRequestActions.loadRequests());
        dispatch(checkAuthTimeout(3600));
      })
      .catch(error => {
        dispatch(authFail(error));
        //dispatch(alertActions.error(error));
        return error;
      });
  };
};

export const authCheckState = () => {
  return async dispatch => {
    AsyncStorage.getItem("token").then(token => {
      if (token === undefined) {
        authLogout();
      } else {
        AsyncStorage.getItem("expirationDate").then(expirationDate => {
          expirationDate = new Date(expirationDate);
          if (expirationDate <= new Date()) {
            authLogout();
          } else {
            dispatch(authSuccess(token));
            dispatch(getCurrentUserActions.getCurrentUser());
            dispatch(friendRequestActions.loadRequests());
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
          }
        });
      }
    });
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(logout());
    dispatch(getCurrentUserActions.getCurrentUserLogout());
    dispatch(friendRequestActions.clearFriendRequests());
  };
};
