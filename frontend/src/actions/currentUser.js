import * as actionTypes from "./types";
import axios from "axios";
import { currentUserAPI } from "../server";

import * as alertActions from "./alerts";

export const getCurrentUserStart = () => {
  return {
    type: actionTypes.GET_CURRENT_USER_START
  };
};

export const getCurrentUserSuccess = (id, username, first_name, last_name, email, profile) => {
  return {
    type: actionTypes.GET_CURRENT_USER_SUCCESS,
    id,
    username,
    first_name,
    last_name,
    email,
    profile
  };
};

export const getCurrentUserFail = error => {
  return {
    type: actionTypes.GET_CURRENT_USER_FAIL,
    error: error
  };
};

export const getCurrentUserLogout = () => {
  return { type: actionTypes.GET_CURRENT_USER_LOGOUT };
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
  };
  return dispatch => {
    dispatch(getCurrentUserStart());
    return axios
      .get(currentUserAPI, headers)
      .then(res => {
        const { id, username, first_name, last_name, email, profile } = res.data;
        dispatch(getCurrentUserSuccess(id, username, first_name, last_name, email, profile));
      })
      .catch(error => {
        dispatch(getCurrentUserFail(error));
        dispatch(alertActions.error(error));
        return error;
      });
  };
};

export const loading = () => {
  return {
    type: actionTypes.LOADING
  };
};

export const done = () => {
  return {
    type: actionTypes.DONE
  };
};

export const putCurrentUser = (username, email, first_name, last_name) => {
  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
  };
  return dispatch => {
    dispatch(loading());
    return axios
      .put(
        currentUserAPI,
        {
          username,
          email,
          first_name,
          last_name
        },
        headers
      )
      .then(res => {
        dispatch(done());
        dispatch({ type: actionTypes.PUT_CURRENT_USER, username, email, first_name, last_name });
        dispatch(alertActions.addAlert("Informazioni aggiornate con successo!", "success"));
      })
      .catch(error => {
        dispatch(done());
        dispatch(alertActions.error(error));
        return error;
      });
  };
};

//export const clearCurrentUser = () => {};
