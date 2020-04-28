import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import Signup from "../Signup";
import Posts from "../Posts";
import PostDetails from "../PostDetails";
import Header from "../Header"

export const routes = {
  root: "/",
  signup: "/signup",
  posts: "/posts",
  details: "/post/details/:id"
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Header/>
      <Switch>
        <Route exact path={routes.root} component={LoginPage} />
        <Route exact path={routes.signup} component={Signup} />
        <Route exact path={routes.posts} component={Posts} />
        <Route exact path={routes.details} component={PostDetails} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
