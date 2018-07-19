import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Navigation from "../navigation/navigation"
import "./TweeterHandles.css"
import Follow from "../follow-button/follow-button"
import Unfollow from "../unfollow-button/unfollow-button"

const GET_USERS = gql`
  query {
    me {
      id
      email
      followers {
        id
        email
      }
    }
    users {
      name
      email
      id
      followers {
        id
        email
      }
    }
  }
`

class TweeterHandles extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Query query={GET_USERS}>
            {({ loading, error, data, refetch }) => {
              if (loading) {
                return "Loading..."
              }

              if (error) {
                console.log(error)
                return (
                  <div className="not-authorized">
                    You're not signed in! <a href="/login"> Log in </a> or{" "}
                    <a href="/signup"> sign up</a> to view and follow other
                    tweeters.
                  </div>
                )
              }

              return (
                <div className="tweeter-handle-container">
                  {console.log(data.me)}
                  {data.users.map(user => {
                    let alreadyFollowed
                    const email_array = data.me.followers.map(x => x.email)
                    console.log(
                      user.email,
                      email_array,
                      email_array.includes(user.email)
                    )
                    if (email_array.includes(user.email)) {
                      alreadyFollowed = true
                    } else {
                      alreadyFollowed = false
                    }
                    return (
                      <div className="user-tweet" key={user.id}>
                        <span className="tweet-author">
                          <a href={"/" + user.id}>{user.name}</a>
                        </span>
                        <span className="tweet-email">{user.email}</span>
                        {alreadyFollowed ? (
                          <Unfollow
                            email={user.email}
                            alreadyFollowed={alreadyFollowed}
                            refetchFollow={refetch}
                          />
                        ) : (
                          <Follow
                            email={user.email}
                            alreadyFollowed={alreadyFollowed}
                            refetchFollow={refetch}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            }}
          </Query>
        </div>
        <Navigation />
      </div>
    )
  }
}

export default TweeterHandles
