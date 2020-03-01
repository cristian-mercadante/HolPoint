import { GET_GROUP, POST_GROUP } from "./types";
import axios from "axios";
import { groupsAPI } from "../server";

// detailAPI
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

export const postGroup = (name, description, profiles) => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .post(
        `${groupsAPI}`,
        {
          name,
          description,
          profiles
        },
        headers
      )
      .then(res => {
        dispatch({
          type: POST_GROUP,
          payload: res.data
        });
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  };
};
