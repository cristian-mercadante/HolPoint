import * as actionTypes from "./types";
import axios from "axios";
import { currentUserAPI } from "../server";

export const getCurrentUserStart = () => {
  return {
    type: actionTypes.GET_CURRENT_USER_START
  };
};

export const getCurrentUserSuccess = (id, username, first_name, last_name, profile) => {
  return {
    type: actionTypes.GET_CURRENT_USER_SUCCESS,
    id,
    username,
    first_name,
    last_name,
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
        const { id, username, first_name, last_name, profile } = res.data;
        dispatch(getCurrentUserSuccess(id, username, first_name, last_name, profile));
      })
      .catch(error => {
        dispatch(getCurrentUserFail(error));
        return error;
      });
  };
};

//export const clearCurrentUser = () => {};
