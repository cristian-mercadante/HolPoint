import { GET_FRIEND_REQUESTS, POST_FRIEND_REQUEST, PUT_FRIEND_REQUEST, CLEAR_FRIEND_REQUESTS } from "../actions/types";
import { updateObject } from "./utility";

const initialState = {
  sentRequests: [],
  receivedRequests: [],
  loading: true
};

const getFriendRequests = (state, action) => {
  const { sent_requests, received_requests } = action.payload;
  return updateObject(state, {
    sentRequests: sent_requests,
    receivedRequests: received_requests,
    loading: false
  });
};

const postFriendRequest = (state, action) => {
  return updateObject(state, { sentRequests: [...state.sentRequests, action.payload] });
};

const putFriendRequest = (state, action) => {
  const { requestId } = action;
  let receivedRequests = state.receivedRequests.filter(fr => fr.id !== requestId);
  if (!receivedRequests) receivedRequests = [];
  return updateObject(state, { receivedRequests });
};

const clearFriendRequests = (state, action) => {
  return initialState;
};

const friendRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIEND_REQUESTS:
      return getFriendRequests(state, action);
    case POST_FRIEND_REQUEST:
      return postFriendRequest(state, action);
    case PUT_FRIEND_REQUEST:
      return putFriendRequest(state, action);
    case CLEAR_FRIEND_REQUESTS:
      return clearFriendRequests(state, action);
    default:
      return state;
  }
};

export default friendRequestReducer;
