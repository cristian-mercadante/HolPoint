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
      for (const e of Object.entries(error.response.data)) {
        let message = "";
        let k = e[0].replace(/^\w/, chr => chr.toUpperCase());
        let v = e[1];
        if (k !== "Non_field_errors") {
          message += `${k}: ${v}\n`;
        } else {
          message += `${v}\n`;
        }
        dispatch(addAlert(message, "danger"));
      }
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
