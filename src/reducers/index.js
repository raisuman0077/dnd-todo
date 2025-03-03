import { combineReducers } from "@reduxjs/toolkit";
import todo from "./todo";
import orderedTodo from "./orderedTodo";
import snackbar from "./snackbar";
import orderedTodayTodo from "./orderedTodayTodo";
import scheduledTodo from "./scheduledTodo";
import unScheduledTodo from "./unscheduledTodo";
const rootReducer = combineReducers({
  todo,
  orderedTodo,
  orderedTodayTodo,
  scheduledTodo,
  unScheduledTodo,
  snackbar,
});

export default rootReducer;
