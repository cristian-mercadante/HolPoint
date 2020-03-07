import * as actionTypes from "./types";

export const addAlert = (text, style) => {
  return {
    type: actionTypes.ADD_ALERT,
    text: text,
    style: style
  };
};

export const error = error => {
  return dispatch => {
    if (error.response) {
      let message = "";
      for (const v of Object.values(error.response.data)) {
        message += v;
        message += "\n";
      }
      dispatch(addAlert(message, "danger"));
    } else {
      dispatch(addAlert(error.message, "danger"));
    }
    return {
      type: actionTypes.ERROR,
      error: error
    };
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
