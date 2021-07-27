import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import calendarReducer from "./calendar.reducer";
import droneReducer from "./drone.reducer";
import requesterReducer from "./requester.reducer";
import sprayerReducer from "./sprayer.reducer";

export default combineReducers({
  auth: authReducer,
  calendar: calendarReducer,
  drone: droneReducer,
  requester: requesterReducer,
  sprayer: sprayerReducer,
});
