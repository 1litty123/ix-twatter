import * as React from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import Navigation from "../navigation/navigation"
import "./signup.css"

const SIGN_UP = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`

class SignUp extends React.Component {
  state = {
    email: "",
    name: "",
    password: ""
  }

  render() {
    return (
      <div>
        <Navigation history={this.props.history} />
        <div className="signup-form">
          <Mutation mutation={SIGN_UP}>
            {(signup, { error }) => {
              if (error) {
                return (
                  <div className="error">
                    That email is already in use.{" "}
                    <a href="/signup"> Sign up again</a> or{" "}
                    <a href="/login"> login.</a>
                  </div>
                )
              }
              return (
                <form
                  onSubmit={async e => {
                    e.preventDefault()
                    //WHATEVER YOU DO HERE, is run when you submit the form
                    const { data } = await signup({
                      variables: {
                        email: this.state.email,
                        name: this.state.name,
                        password: this.state.password
                      }
                    })
                    localStorage.setItem("token", data.signup.token)
                    this.props.history.push("/")
                  }}
                >
                  <div className="input-container">
                    <input
                      type="text"
                      onChange={e => {
                        this.setState({
                          name: e.target.value
                        })
                      }}
                      placeholder="name"
                    />
                    <p />
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
                  <div className="signup-button">
                    <button type="submit">
                      <b>Sign Up </b>
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

export default SignUp
