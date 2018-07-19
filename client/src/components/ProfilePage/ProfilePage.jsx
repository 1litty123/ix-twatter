import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import "./ProfilePage.css"
import Navigation from "../navigation/navigation.jsx"

const GET_USER_INFO = gql`
  query userById($id: ID!) {
    userById(id: $id) {
      name
      email
      followers {
        id
        name
        email
      }
      tweets {
        text
      }
    }
  }
`

class ProfilePage extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="profile-page">
          <Query
            variables={{
              id: this.props.match.params.id
            }}
            query={GET_USER_INFO}
          >
            {({ loading, error, data, refetch }) => {
              if (loading) {
                return "Loading..."
              }
              if (error) {
                return "OOps, somehing blew up."
              }
              return (
                <div className="tweeter-handle-container">
                  <div className="tweeter-profile">
                    <div className="tweet-author">{data.userById.name}</div>
                    <div className="tweet-email">{data.userById.email}</div>
                    <div className="following-section">
                      <p />
                      <b>
                        <i>Following ({data.userById.followers.length})</i>
                      </b>
                      {data.userById.followers.map(follows => {
                        return (
                          <div className="following">
                            <a href={"/" + follows.id}>{follows.name}</a> —{" "}
                            {follows.email}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {data.userById.tweets
                    .map(tweet => {
                      return <div className="user-tweet">{tweet.text}</div>
                    })
                    .reverse()}
                </div>
              )
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default ProfilePage
