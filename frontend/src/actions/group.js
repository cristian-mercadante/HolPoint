import { GET_GROUP } from "./types";
import axios from "axios";
import { groupsAPI } from "../server";

// listAPI
export const getGroup = id => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .get(`${groupsAPI}${id}/`, headers)
      .then(res => {
        dispatch({
          type: GET_GROUP,
          payload: res.data
        });
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  };
};
