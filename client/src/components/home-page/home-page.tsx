import * as React from "react"
import Feed from "../feed/feed"
import Navigation from "../navigation/navigation.jsx"

class HomePage extends React.Component {
  public render() {
    return (
      <div>
        <Navigation />
        <div className="feed">
          <Feed />
        </div>
      </div>
    )
  }
}

export default HomePage
