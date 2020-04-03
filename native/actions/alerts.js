import * as actionTypes from "./types";

export const addAlert = text => {
  return {
    type: actionTypes.ADD_ALERT,
    text: text
  };
};

export const error = error => {
  return dispatch => {
    if (error.response) {
      let i = 0;
      for (const e of Object.entries(error.response.data)) {
        let message = i === 0 ? "" : "\n";
        let k = e[0].replace(/^\w/, chr => chr.toUpperCase());
        let v = e[1];
        if (k !== "Non_field_errors") {
          message += `${k}: ${v}`;
        } else {
          message += `${v}`;
        }
        dispatch(addAlert(message));
      }
    } else {
      dispatch(addAlert(error.message));
    }
    return {
      type: actionTypes.ERROR,
      error: error
    };
  };
};
