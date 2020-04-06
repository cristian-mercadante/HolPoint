import * as actionTypes from "../actions/types";
import Toast from "react-native-simple-toast";

const initialState = [];

const addAlert = (state, action) => {
  Toast.show(action.text, Toast.SHORT);
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
