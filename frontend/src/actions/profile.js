import * as actionTypes from "./types";
import axios from "axios";
import { profileAPI } from "./server";

export const getProfile = (username, token) => {
  return dispatch => {
    console.log(token + "token");
    const headers = {
      headers: { "Content-Type": "application/json", Authorization: `Token ${token}` }
    };
    return axios
      .get(`${profileAPI}${username}`, headers)
      .then(res => {
        dispatch({
          type: actionTypes.GET_PROFILE,
          payload: res.data
        });
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  };
};
