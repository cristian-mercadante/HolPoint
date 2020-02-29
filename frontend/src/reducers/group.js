import { GET_GROUP } from "../actions/types";
import { updateObject } from "./utility";

const initialState = {
  loading: true,
  error: null,
  groups: []
};

const getGroup = (state, action) => {
  return updateObject(state, {
    loading: false,
    groups: [...state.groups, action.payload]
  });
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP:
      return getGroup(state, action);
    default:
      return state;
  }
};

export default groupReducer;
