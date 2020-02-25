import { combineReducers } from "redux";
import authReducer from "./auth";
import alertsReducer from "./alerts";
import profileReducer from "./profile";

export default combineReducers({
  auth: authReducer,
  alerts: alertsReducer,
  profile: profileReducer
});
