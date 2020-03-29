import { combineReducers } from "redux";
import authReducer from "./auth";
//import alertsReducer from "./alerts";
import getCurrentUserReducer from "./currentUser";
import friendRequestReducer from "./friendRequest";

export default combineReducers({
  auth: authReducer,
  //alerts: alertsReducer,
  currentUser: getCurrentUserReducer,
  friendRequest: friendRequestReducer
});
