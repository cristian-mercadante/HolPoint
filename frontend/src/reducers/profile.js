import { GET_PROFILE } from "../actions/types";
import { updateObject } from "./utility";

const initialState = { loading: true, error: null, profile: null };

const getProfile = (state, action) => {
  return updateObject(state, {
    loading: false,
    profile: action.payload
  });
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return getProfile(state, action);
    default:
      return state;
  }
};

export default profileReducer;
