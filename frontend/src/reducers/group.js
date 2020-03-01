import { GET_GROUP, POST_GROUP } from "../actions/types";
import { updateObject } from "./utility";

const initialState = {
  loading: true,
  error: null,
  groups: []
};

const updateGroupsArray = (groups, newGroup) => {
  let _groups = [...groups];
  let index = _groups.findIndex(x => x.id === newGroup.id);
  if (index !== -1) {
    _groups[index] = newGroup;
  } else {
    _groups.push(newGroup);
  }
  return _groups;
};

const getGroup = (state, action) => {
  return updateObject(state, {
    loading: false,
    groups: updateGroupsArray(state.groups, action.payload)
  });
};

const postGroup = (state, action) => {
  return updateObject(state, {
    loading: false,
    groups: [...state.groups, action.payload]
  });
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP:
      return getGroup(state, action);
    case POST_GROUP:
      return postGroup(state, action);
    default:
      return state;
  }
};

export default groupReducer;
