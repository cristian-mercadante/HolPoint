import { combineReducers } from "redux";
import authReducer from "./auth";
import alertsReducer from "./alerts";
import profileReducer from "./profile";
import getCurrentUserReducer from "./currentUser";
import groupReducer from "./group";

export default combineReducers({
  auth: authReducer,
  alerts: alertsReducer,
  profile: profileReducer,
  currentUser: getCurrentUserReducer,
  group: groupReducer
});
