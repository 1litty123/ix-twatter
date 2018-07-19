import * as React from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import "./tweetform.css"

const CREATE_TWEET = gql`
  mutation createTweet($text: String!) {
    createTweet(text: $text) {
      text
      author {
        id
        name
        email
      }
    }
  }
`

class CreateTweetForm extends React.Component {
  render() {
    const token = localStorage.getItem("token")
    let input
    return (
      <div>
        <Mutation mutation={CREATE_TWEET}>
          {(createTweet, { data, error }) => {
            if (error) {
              return (
                <div className="no-authorized">
                  You're not signed in! <a href="/login"> Log in </a> or{" "}
                  <a href="/signup"> sign up. </a>
                </div>
              )
            }
            return (
              <div className="tweet-form">
                <form>
                  <input
                    id="input"
                    placeholder="What's on your mind?"
                    ref={node => {
                      input = node
                    }}
                  />
                  <button
                    type="submit"
                    onClick={async e => {
                      const input = document.getElementById("input")
                      e.preventDefault()
                      await createTweet({
                        variables: {
                          text: input.value
                        }
                      })
                      this.props.refetchTweets()
                      input.value = ""
                    }}
                  >
                    Tweet!
                  </button>
                </form>
              </div>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default CreateTweetForm
