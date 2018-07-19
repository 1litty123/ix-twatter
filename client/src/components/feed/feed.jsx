import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import CreateTweetForm from "../tweet-form/tweetform"

const GET_TWEETS = gql`
  query {
    feed(orderBy: "createdAt_DESC") {
      text
      author {
        name
        email
        id
      }
    }
  }
`

class Feed extends React.Component {
  render() {
    const token = localStorage.getItem("token")
    return (
      <div>
        <Query query={GET_TWEETS}>
          {({ loading, error, data, refetch }) => {
            let data_object = []
            if (loading) {
              return "Loading..."
            }

            if (error) {
              console.log(error)
              return "Oops, something blew up."
            }
            return (
              <div className="feed-container">
                <CreateTweetForm refetchTweets={refetch} />

                {data.feed.map(feed => {
                  return (
                    <div className="feed-tweet">
                      <span className="feed-author">
                        <a href={"/" + feed.author.id}>{feed.author.name}</a>
                      </span>
                      <span className="feed-email">{feed.author.email}</span>
                      <p>{feed.text}</p>
                    </div>
                  )
                })}
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Feed
