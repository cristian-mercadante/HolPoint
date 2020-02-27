import { GET_GROUPS } from "../actions/types";
import { updateObject } from "./utility";

const initialState = {
  loading: true,
  error: null,
  groups: []
};

const getGroups = (state, action) => {
  return updateObject(state, {
    loading: false,
    groups: action.payload
  });
};

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUPS:
      return getGroups(state, action);
    default:
      return state;
  }
};

export default groupsReducer;
