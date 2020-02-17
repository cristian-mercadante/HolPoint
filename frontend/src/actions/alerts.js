import * as actionTypes from "./types";

export const addAlert = (text, style) => {
  return {
    type: actionTypes.ADD_ALERT,
    text: text,
    style: style
  };
};

export const removeAlert = id => {
  return {
    type: actionTypes.REMOVE_ALERT,
    id: id
  };
};

export const removeAllAlerts = () => {
  return {
    type: actionTypes.REMOVE_ALL_ALERTS
  };
};
