import React, { useState, useEffect, useRef } from 'react'
import './ocean.css'
import InSessionBox from './InSessionBox'
import SessionBox from './SessionBox'
import Fish from './Fish'

import { getSessions, updateSession } from '../../actions/sessions'


let counter = 0;

console.log("node react env: ", process.env.NODE_ENV)

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  counter = 1;
  console.log("DEV")
} else {
  // production code
  counter = 4;
  console.log("PROD")
}

// Create some sort of mapping of session data onto fishes that just swim around the ocean
const Ocean = ({user, setUser, users, sessions, setSessions, inSession, setInSession}) => {

  const [session, setSession] = useState({
    userId: user._id,
    goalId: '',
    title: '',
  })
  const [currentSessions, setCurrentSessions] = useState([])
  const [newSessionId, setNewSessionId] = useState('')
  const sessionRef = useRef()
  const newIdRef = useRef()
  sessionRef.current = inSession
  newIdRef.current = newSessionId


  useEffect(() => {
    console.log('mount useEffect run')

    // sets current sessions to the sessions that are currently still in progress
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // dev code
      counter = 1;
    } else {
      // production code
      counter = 4;
    }
    getSessions(setSessions)

    // cleanup function on unmount to reset the counter to 1
    return function cleanup() {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        counter = 1;
      } else {
        // production code
        counter = 4;
      }

      console.log('CLEANUP :', sessionRef.current)

      // if function inSession -> end the session and update it
      if (sessionRef.current === true) {
        const endSession = session
        endSession.endTime = new Date()
        updateSession(endSession, newIdRef.current)
        setInSession(false)
      } else {
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