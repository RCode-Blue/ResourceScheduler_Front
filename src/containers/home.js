import React from 'react'
import calendar from "../img/calendar.png";

class Home extends React.Component {
  render() {
    return (
      <div>
        <center>
          <img src={calendar} alt="." width="45 px"></img>
          <br/><br/>
          <h1>Resource Scheduler</h1>
          <p>The resource booking app</p>
        </center>
      </div>
    )
  }
}

export default Home

