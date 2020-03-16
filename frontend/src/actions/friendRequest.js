import { GET_FRIEND_REQUESTS, POST_FRIEND_REQUEST, PUT_FRIEND_REQUEST, CLEAR_FRIEND_REQUESTS } from "./types";
import axios from "axios";
import { friendRequestListAPI, friendRequestAPI } from "../server";
import * as alertActions from "../actions/alerts";

export const getFriendRequests = data => {
  return {
    type: GET_FRIEND_REQUESTS,
    payload: data
  };
};

export const postFriendRequest = data => {
  return {
    type: POST_FRIEND_REQUEST,
    payload: data
  };
};

export const putFriendRequest = requestId => {
  return {
    type: PUT_FRIEND_REQUEST,
    requestId
  };
};

export const clearFriendRequests = () => {
  return { type: CLEAR_FRIEND_REQUESTS };
};

export const loadRequests = () => {
  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
  };
  return dispatch => {
    return axios
      .get(friendRequestListAPI, headers)
      .then(res => {
        dispatch(getFriendRequests(res.data));
      })
      .catch(error => {
        dispatch(alertActions.error(error));
      });
  };
};

export const sendRequest = (senderId, receiverId) => {
  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
  };
  return dispatch => {
    return axios
      .post(
        friendRequestAPI,
        {
          sender: senderId,
          receiver: receiverId,
          status: "Pen"
        },
        headers
      )
      .then(res => {
        dispatch(postFriendRequest(res.data));
      })
      .catch(error => {
        dispatch(alertActions.error(error));
      });
  };
};

export const respondRequest = (requestId, senderId, receiverId, status) => {
  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
  };
  return dispatch => {
    return axios
      .put(
        `${friendRequestAPI}${requestId}/`,
        {
          sender: senderId,
          receiver: receiverId,
          status: status
        },
        headers
      )
      .then(res => {
        dispatch(putFriendRequest(requestId));
      })
      .catch(error => {
        dispatch(alertActions.error(error));
      });
  };
};
