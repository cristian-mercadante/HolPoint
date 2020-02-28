import * as actionTypes from "./types";
import axios from "axios";
import { groupsAPI } from "./server";

// listAPI
export const getGroups = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    console.log(groupsAPI);
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .get(`${groupsAPI}`, headers)
      .then(res => {
        dispatch({
          type: actionTypes.GET_GROUPS,
          payload: res.data
        });
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  };
};
