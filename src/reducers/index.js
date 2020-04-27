import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import users from "./users"
import posts from "./posts"

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    users,
    posts
  });
