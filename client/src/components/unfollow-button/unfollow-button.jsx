import * as React from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import { Query } from "react-apollo"
import "./unfollow-button.css"

const UNFOLLOW_USER = gql`
  mutation unfollow($email: String!) {
    unfollow(email: $email) {
      name
      email
      followers {
        id
        name
        email
      }
    }
  }
`
class Unfollow extends React.Component {
  state = {
    hasFollowed: this.props.alreadyFollowed
  }
  render() {
    const token = localStorage.getItem("token")
    return (
      <Mutation mutation={UNFOLLOW_USER}>
        {(unfollow, { data, loading, error, refetch }) => {
          console.log({ data })
          if (error) {
            return "OOPSIE CANT FOLLOW"
          }

          if (loading) {
            return <button className="unfollow">Unfollowing</button>
          }
          return (
            <button
              className="unfollow"
              onClick={async () => {
                if (this.state.hasFollowed === true) {
                  await unfollow({
                    variables: {
                      email: this.props.email
                    }
                  })
                  this.setState({
                    hasFollowed: false
                  })
                }
                this.props.refetchFollow()
              }}
            >
              {this.state.hasFollowed ? "Unfollow" : null}
            </button>
          )
        }}
      </Mutation>
    )
  }
}

export default Unfollow
