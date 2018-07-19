import * as React from "react"

class Tweet extends React.Component {
  render() {
    return (
      <div>
        {this.props.text}
        <div className="tweet-author">{this.props.author.name}</div>
      </div>
    )
  }
}

export default Tweet
