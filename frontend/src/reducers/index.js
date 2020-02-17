import { combineReducers } from "redux";
import authReducer from "./auth";
import alertsReducer from "./alerts";

export default combineReducers({
  auth: authReducer,
  alerts: alertsReducer
});
