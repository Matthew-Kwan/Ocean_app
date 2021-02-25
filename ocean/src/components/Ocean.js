import React, { useState, useEffect } from 'react'
import './ocean.css'




const Ocean = ({user, setUser}) => {

  return (
    <div className="ocean">
      <div>
        <h1>Ocean</h1>
      </div>

      <div className="oceanContent">
        {/*other fish*/}
        <div className="currentSessionBox">
          <h1>Current Sessions</h1>
        </div>
        {/*absolute position for session box*/}
        <div className="sessionBox">
          <h1> Session </h1>
        </div>
      </div>
    </div>
  )
}

export default Ocean;