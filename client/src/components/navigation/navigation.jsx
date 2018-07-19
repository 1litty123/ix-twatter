import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import logo from "./logo.png"
import "./navigation.css"

const GET_ME = gql`
  query me {
    me {
      id
      name
      email
    }
  }
`

class Navigation extends React.Component {
  onLogout = () => {
    localStorage.removeItem("token")
    this.props.history.push("/login")
  }
  render() {
    const token = localStorage.getItem("token")
    return (
      <div>
        <header className="navigation-header">
          <img src={logo} className="navigation-logo" alt="logo" />
          <h1 className="navigation-title-h1">Tweeter</h1>
          <h2 className="navigation-title-h2">
            <a href="/"> Feed</a>
          </h2>
          <h2 className="navigation-title-h2">
            <a href="/tweeterhandles">Tweeter Handles</a>
          </h2>
          {token ? (
            <Query query={GET_ME}>
              {({ data, loading, error }) => {
                if (loading) {
                  return ""
                }
                if (error) {
                  return ""
                }

                return (
                  <div className="navigation-name">
                    <i>
                      <b>Hi, {data.me.name}.</b>
                    </i>
                    <p />
                    <a href={"/" + data.me.id}>
                      <b>My Profile</b>
                    </a>
                    <p />
                    <a onClick={this.onLogout} href="/">
                      <b> Logout</b>
                    </a>
                  </div>
                )
              }}
            </Query>
          ) : (
            <h2 className="navigation-name">
              <p>
                <a href="/signup">Sign up</a>
              </p>
              <a href="/login">Login</a>
            </h2>
          )}
        </header>
      </div>
    )
  }
}

export default Navigation
