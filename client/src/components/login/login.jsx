import * as React from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import Navigation from "../navigation/navigation"
import "./login.css"

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  }

  render() {
    return (
      <div>
        <Navigation history={this.props.history} />
        <div className="login-form">
          <Mutation mutation={LOGIN}>
            {(login, { error }) => {
              if (error) {
                return (
                  <div className="not-an-account">
                    Oops, invalid email and/or password. {" "}
                    <a href="/login"> Login again</a> or{" "}
                    <a href="/signup"> Sign up.</a>
                  </div>
                )
              }
              return (
                <form
                  onSubmit={async e => {
                    e.preventDefault()
                    //WHATEVER YOU DO HERE, is run when you submit the form
                    const { data } = await login({
                      variables: {
                        email: this.state.email,
                        password: this.state.password
                      }
                    })
                    localStorage.setItem("token", data.login.token)
                    this.props.history.push("/")
                  }}
                >
                  <div className="input-container">
                    <input
                      type="text"
                      onChange={e => {
                        this.setState({
                          email: e.target.value
                        })
                      }}
                      placeholder="email"
                    />
                    <p />
                    <input
                      type="password"
                      onChange={e => {
                        this.setState({
                          password: e.target.value
                        })
                      }}
                      placeholder="password"
                    />
                  </div>
                  <div className="login-button">
                    <button type="submit">
                      <b>Login </b>
                    </button>
                  </div>
                </form>
              )
            }}
          </Mutation>
        </div>
      </div>
    )
  }
}

export default Login
