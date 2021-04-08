import React, { useState, useEffect } from 'react'
import './ocean.css'
import InSessionBox from './InSessionBox'
import SessionBox from './SessionBox'
import Fish from './Fish'

import { getSessions, updateSession } from '../../actions/sessions'
import { checkSession } from '../../actions/users'

let counter = 1;

// Create some sort of mapping of session data onto fishes that just swim around the ocean
const Ocean = ({user, setUser, users, sessions, setSessions, setLoggedIn}) => {

  console.log(user)

  const [inSession, setInSession] = useState(false)
  const [session, setSession] = useState({
    userId: user._id,
    goalId: '',
    title: '',
  })
  const [currentSessions, setCurrentSessions] = useState([])
  const [newSessionId, setNewSessionId] = useState('')

  useEffect(() => {
    console.log('mount useEffect run')
    // sets current sessions to the sessions that are currently still in progress
    counter = 1
    getSessions(setSessions)

    // cleanup function on unmount to reset the counter to 1
    return function cleanup() {
      counter = 1
      console.log('inSession: ', inSession)

      // if function inSession -> end the session and update it
      if (inSession === true) {
        const endSession = session
        endSession.endTime = new Date()
        updateSession(endSession, newSessionId)
        setInSession(false)
      }
    }
  }, [])

  useEffect(() => {
    console.log('session useEffect run')

    // if endTime is not defined, then that means that the session is still in progress
    let currSess = sessions.filter((s) => s.endTime === undefined)

    console.log(currSess)

    // HARDCODE: limits the number of fish to 3
    if (currSess.length > 3) {
      console.log(currSess.length)
      currSess = currSess.slice(currSess.length-3,currSess.length)
    }
    setCurrentSessions(currSess)
  }, [sessions])

  const handleFish = (session) => {
    session = {...session, counter: counter }
    counter = counter + 1
    return (
      <li key={session.id} className="fishListItem"><Fish users={users} user={user} setUser={setUser} session={session} fishType="ocean"/></li>
    )
  }

  return (
    <div className="ocean">
      <button onClick={() => checkSession()}>Check Session</button>

      <div className="oceanContent">
        {/*other fish*/}
        <div className="currentSessionBox">
          <ul id="fishList">
            {currentSessions.map(session => handleFish(session))}
          </ul>
        </div>
        {/*absolute position for session box*/}
        <div className="sessionBox">
          {inSession ? <InSessionBox session={session} setInSession={setInSession} goalTitle={session.goalId ? user.goals.filter(g => g._id == session.goalId)[0].title : "No Goal Selected!"} newSessionId={newSessionId}/>
          : <SessionBox user={user} session={session} setSession={setSession} setInSession={setInSession} setNewSessionId={setNewSessionId}/>}
        </div>
      </div>
    </div>
  )
}

export default Ocean;