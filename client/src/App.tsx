import * as React from "react"
import { hot } from "react-hot-loader"
import { Switch, Route } from "react-router-dom"
import HomePage from "./components/home-page/home-page"
import TweeterHandles from "./components/TweeterHandles/TweeterHandles"
import ProfilePage from "./components/ProfilePage/ProfilePage"
import Login from "./components/login/login"
import SignUp from "./components/signup/signup"

import "./App.css"

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/signup" component={SignUp} />
          <Route
            exact={true}
            path="/tweeterhandles"
            component={TweeterHandles}
          />
          <Route exact={true} path="/:id" component={ProfilePage} />
        </Switch>
      </div>
    )
  }
}

export default hot(module)(App)
