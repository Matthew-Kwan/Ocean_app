import React, { useState, useEffect } from 'react'
import './ocean.css'
import InSessionBox from './InSessionBox'
import SessionBox from './SessionBox'
import Fish from './Fish'


// Create some sort of mapping of session data onto fishes that just swim around the ocean
const Ocean = ({user, sessions}) => {

  /* states that will need to be here / passed in
  user -> goals, friends
  sessions -> currently ongoing sessions
  */

  const [inSession, setInSession] = useState(false)
  const [session, setSession] = useState({
    title: '',
    goal: '',
  })
  const [currentSessions, setCurrentSessions] = useState([])

  useEffect(() => {
    const tmpCurrentSessions = sessions.filter((s) => s.endTime === null)
    setCurrentSessions(tmpCurrentSessions)
  }, [])

  return (
    <div className="ocean">
      <div>
        <h1>Ocean: {user.username} </h1>
      </div>

      <div className="oceanContent">
        {/*other fish*/}
        <div className="currentSessionBox">
          <h1>Current Sessions</h1>
          {currentSessions.map(session => <Fish session={session}/>)}
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