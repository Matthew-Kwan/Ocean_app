import React, { useState} from 'react'
import './ocean.css'
import InSessionBox from './InSessionBox'
import SessionBox from './SessionBox'


// Create some sort of mapping of session data onto fishes that just swim around the ocean

const Fish = (session) => {
  return (
    <h1>Fish</h1>
  )
}

const Ocean = ({user}) => {

  /* states that will need to be here / passed in
  user -> goals, friends
  sessions -> currently ongoing sessions
  */

  const [inSession, setInSession] = useState(false)
  const [session, setSession] = useState({
    title: '',
    goal: '',
  })

  return (
    <div className="ocean">
      <div>
        <h1>Ocean: {user.username} </h1>
      </div>

      <div className="oceanContent">
        {/*other fish*/}
        <div className="currentSessionBox">
          <h1>Current Sessions</h1>
          <Fish/>
        </div>
        {/*absolute position for session box*/}
        <div className="sessionBox">
          {inSession ? <InSessionBox session={session} setInSession={setInSession}/> : <SessionBox user={user} session={session} setSession={setSession} setInSession={setInSession}/>}
        </div>
      </div>
    </div>
  )
}

export default Ocean;