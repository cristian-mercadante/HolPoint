import * as actionTypes from "./types";
import axios from "axios";
import { currentUserAPI, pictureUploadAPI } from "../server";
import { AsyncStorage, Platform } from "react-native";
import * as alertActions from "./alerts";

export const getCurrentUserStart = () => {
  return {
    type: actionTypes.GET_CURRENT_USER_START,
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
    profile,
  };
};

export const getCurrentUserFail = (error) => {
  return {
    type: actionTypes.GET_CURRENT_USER_FAIL,
    error: error,
  };
};

export const getCurrentUserLogout = () => {
  return { type: actionTypes.GET_CURRENT_USER_LOGOUT };
};

export const getCurrentUser = () => {
  return async (dispatch) => {
    dispatch(loading());
    AsyncStorage.getItem("token").then((token) => {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };
      dispatch(getCurrentUserStart());
      return axios
        .get(currentUserAPI, headers)
        .then((res) => {
          const { id, username, first_name, last_name, email, profile } = res.data;
          dispatch(getCurrentUserSuccess(id, username, first_name, last_name, email, profile));
          dispatch(done());
        })
        .catch((error) => {
          dispatch(getCurrentUserFail(error));
          dispatch(done());
          dispatch(alertActions.error(error));
          return error;
        });
    });
  };
};

export const loading = () => {
  return {
    type: actionTypes.LOADING,
  };
};

export const done = () => {
  return {
    type: actionTypes.DONE,
  };
};

export const pictureUpdate = (data) => {
  return {
    type: actionTypes.PICTURE_UPDATE,
    data: data,
  };
};

export const putCurrentUser = (username, email, first_name, last_name) => {
  return async (dispatch) => {
    dispatch(loading());
    AsyncStorage.getItem("token").then((token) => {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };
      return axios
        .put(currentUserAPI, { username, email, first_name, last_name }, headers)
        .then((res) => {
          dispatch({ type: actionTypes.PUT_CURRENT_USER, username, email, first_name, last_name });

          dispatch(done());
        })
        .catch((error) => {
          dispatch(done());
          dispatch(alertActions.error(error));
        });
    });
  };
};

export const putCurrentUserPicture = (picture) => {
  return async (dispatch) => {
    dispatch(loading());
    AsyncStorage.getItem("token").then((token) => {
      const uri = picture.uri;
      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const payloadKey = "picture";
      const form_data = new FormData();
      form_data.append(payloadKey, {
        uri,
        name: `profile_pic.${fileType}`,
        type: `image/${fileType}`,
      });
      const headers = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      };
      return axios
        .put(`${pictureUploadAPI}`, form_data, headers)
        .then((res) => {
          dispatch(pictureUpdate(res.data));
          dispatch(done());
        })
        .catch((error) => {
          dispatch(done());
          alert(error.message);
          dispatch(alertActions.error(error));
        });
    });
  };
};

export const addFriendToStore = (friend) => {
  return {
    type: actionTypes.ADD_FRIEND_TO_STORE,
    friend: friend,
  };
};

export const removeFriendFromStore = (friend) => {
  return {
    type: actionTypes.REMOVE_FRIEND_FROM_STORE,
    friend: friend,
  };
};

export const addIdeaToStore = (idea) => {
  return {
    type: actionTypes.ADD_IDEA_TO_STORE,
    idea: idea,
  };
};

export const removeIdeaFromStore = (ideaId) => {
  return {
    type: actionTypes.REMOVE_IDEA_FROM_STORE,
    ideaId: ideaId,
  };
};

export const updateIdeaInStore = (idea) => {
  return {
    type: actionTypes.UPDATE_IDEA_IN_STORE,
    idea: idea,
  };
};

//export const clearCurrentUser = () => {};
