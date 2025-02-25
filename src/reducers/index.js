import { combineReducers } from "@reduxjs/toolkit";
import todo from "./todo";
import orderedTodo from "./orderedTodo";
import snackbar from "./snackbar";

const rootReducer = combineReducers({
  todo,
  orderedTodo,
  snackbar,
});

export default rootReducer;
