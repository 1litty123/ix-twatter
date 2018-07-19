import * as React from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import { Query } from "react-apollo"

import "./follow-button.css"

const FOLLOW_USER = gql`
  mutation follow($email: String!) {
    follow(email: $email) {
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
class Follow extends React.Component {
  state = {
    hasFollowed: this.props.alreadyFollowed
  }
  render() {
    const token = localStorage.getItem("token")
    return (
      <Mutation mutation={FOLLOW_USER}>
        {(follow, { data, loading, error, refetch }) => {
          console.log({ data })
          if (error) {
            return "OOPSIE CANT FOLLOW"
          }

          if (loading) {
            return <button className="follow">Following</button>
          }
          return (
            <button
              className="follow"
              onClick={async () => {
                if (this.state.hasFollowed === false) {
                  await follow({
                    variables: {
                      email: this.props.email
                    }
                  })
                  this.setState({
                    hasFollowed: true
                  })
                }
                this.props.refetchFollow()
              }}
            >
              {this.state.hasFollowed ? "Following" : "Follow"}
            </button>
          )
        }}
      </Mutation>
    )
  }
}

export default Follow
