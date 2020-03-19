import * as actionTypes from "./types";
import axios from "axios";
import { currentUserAPI, pictureUploadAPI } from "../server";

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

export const pictureUpdate = data => {
  return {
    type: actionTypes.PICTURE_UPDATE,
    data: data
  };
};

export const putCurrentUser = (username, email, first_name, last_name, picture) => {
  const token = localStorage.getItem("token");
  let headers = {
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
        if (picture) {
          let form_data = new FormData();
          form_data.append("picture", picture, picture.name);
          headers = {
            headers: {
              "Content-Type": "multiplart/form-data",
              Authorization: `Token ${token}`
            }
          };
          return axios
            .put(`${pictureUploadAPI}`, form_data, headers)
            .then(res => {
              dispatch(pictureUpdate(res.data));
              dispatch(done());
              dispatch({ type: actionTypes.PUT_CURRENT_USER, username, email, first_name, last_name });
              dispatch(alertActions.addAlert("Informazioni aggiornate con successo!", "success"));
            })
            .catch(error => {
              dispatch(alertActions.error(error));
            });
        }
      })
      .catch(error => {
        dispatch(done());
        dispatch(alertActions.error(error));
      });
  };
};

export const addFriendToState = friend => {
  return {
    type: actionTypes.ADD_FRIEND_TO_STATE,
    friend: friend
  };
};

export const removeFriendFromState = friend => {
  return {
    type: actionTypes.REMOVE_FRIEND_FROM_STATE,
    friend: friend
  };
};

//export const clearCurrentUser = () => {};
