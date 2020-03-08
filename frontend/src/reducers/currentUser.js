import * as actionTypes from "../actions/types";
import { updateObject } from "./utility";

const initialState = {
  id: "",
  username: "",
  first_name: "",
  last_name: "",
  email: "",
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
  const { id, username, first_name, last_name, email, profile } = action;
  return updateObject(state, {
    error: null,
    loading: false,
    id,
    username,
    first_name,
    last_name,
    email,
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

const putCurrentUser = (state, action) => {
  const { username, email, first_name, last_name } = action;
  return updateObject(state, {
    username,
    email,
    first_name,
    last_name
  });
};

const loading = (state, action) => {
  return updateObject(state, { loading: true });
};

const done = (state, action) => {
  return updateObject(state, { loading: false });
};

const addIdea = (state, action) => {
  let ideas = state.profile.ideas;
  ideas.push(action.data);
  return updateObject(state, { profile: { ideas: ideas } });
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
    case actionTypes.PUT_CURRENT_USER:
      return putCurrentUser(state, action);
    case actionTypes.LOADING:
      return loading(state, action);
    case actionTypes.DONE:
      return done(state, action);
    case actionTypes.ADD_IDEA:
      return addIdea(state, action);
    default:
      return state;
  }
};

export default getCurrentUserReducer;
