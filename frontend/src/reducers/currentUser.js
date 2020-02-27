import * as actionTypes from "../actions/types";
import { updateObject } from "./utility";

const initialState = {
  id: "",
  username: "",
  first_name: "",
  last_name: "",
  profile: {},
  error: null,
  loading: true
};

const getCurrentUserStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCurrentUserSuccess = (state, action) => {
  const { id, username, first_name, last_name, profile } = action;
  return updateObject(state, {
    error: null,
    loading: false,
    id,
    username,
    first_name,
    last_name,
    profile
  });
};

const getCurrentUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCurrentUserLogout = (state, action) => {
  return updateObject(state, initialState);
};

const getCurrentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER_START:
      return getCurrentUserStart(state, action);
    case actionTypes.GET_CURRENT_USER_SUCCESS:
      return getCurrentUserSuccess(state, action);
    case actionTypes.GET_CURRENT_USER_FAIL:
      return getCurrentUserFail(state, action);
    case actionTypes.GET_CURRENT_USER_LOGOUT:
      return getCurrentUserLogout(state, action);
    default:
      return state;
  }
};

export default getCurrentUserReducer;
