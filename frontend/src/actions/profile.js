import * as actionTypes from "./types";
import axios from "axios";
import { profileAPI } from "../server";
import * as alertActions from "./alerts";

export const getProfile = username => {
  return dispatch => {
    //const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json"
        //, Authorization: `Token ${token}`
      }
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
        dispatch(alertActions.error(error));
        return error;
      });
  };
};
