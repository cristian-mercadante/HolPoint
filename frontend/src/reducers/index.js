import { combineReducers } from "redux";
import authReducer from "./auth";
import alertsReducer from "./alerts";
import profileReducer from "./profile";
import getCurrentUserReducer from "./currentUser";
import groupsReducer from "./groups";

export default combineReducers({
  auth: authReducer,
  alerts: alertsReducer,
  profile: profileReducer,
  currentUser: getCurrentUserReducer,
  groups: groupsReducer
});
