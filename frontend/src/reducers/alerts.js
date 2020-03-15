import * as actionTypes from "../actions/types";
import uuid from "node-uuid";

const initialState = [];

const addAlert = (state, action) => {
  window.scrollTo(0, 0); // scroll top in order to show alert
  return [
    ...state,
    {
      text: action.text,
      style: action.style,
      id: uuid()
    }
  ];
};

const removeAlert = (state, action) => {
  return state.filter(alert => {
    if (alert.id === action.id) {
      return false;
    } else {
      return true;
    }
  });
};

const removeAllAlerts = (state, action) => {
  return initialState;
};

const error = (state, action) => {
  addAlert(state, action);
};

const alertsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ALERT:
      return addAlert(state, action);
    case actionTypes.REMOVE_ALERT:
      return removeAlert(state, action);
    case actionTypes.REMOVE_ALL_ALERTS:
      return removeAllAlerts(state, action);
    case actionTypes.ERROR:
      return error(state, action);
    default:
      return state;
  }
};

export default alertsReducer;
