import { combineReducers } from "redux";
import { project } from "./project";
import { globals } from "./globals";

const rootReducer = combineReducers({
  project,
  globals,
});

export default rootReducer;
