import * as actionTypes from "./types";
import axios from "axios";
import { profileAPI } from "./server";

export const getProfile = username => {
  return dispatch => {
    return axios
      .get(`${profileAPI}${username}`)
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
