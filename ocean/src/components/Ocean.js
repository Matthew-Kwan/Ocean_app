import React, { useState, useEffect } from 'react'
import './ocean.css'
import InSessionBox from './InSessionBox'
import SessionBox from './SessionBox'
import Fish from './Fish'

import { getSessions, updateSession } from '../actions/sessions'

let counter = 1;

// Create some sort of mapping of session data onto fishes that just swim around the ocean
const Ocean = ({user, setUser, users, sessions, setSessions}) => {

  // const sessionsList = [
  //   {
  //     sessionId: 1,
  //     userId: 1,
  //     goalId: 2,
  //     title: "Work on ocean component",
  //     startTime: new Date(2021,2,1,8,0,0),
  //     endTime: new Date(2021,2,1,12,0,0),
  //   },
  //   {
  //     sessionId: 2,
  //     userId: 1,
  //     goalId: 1,
  //     title: "Learn more about React",
  //     startTime: new Date(2021,2,2,8,0,0),
  //     endTime: new Date(2021,2,2,12,0,0),
  //   },
  //   {
  //     sessionId: 3,
  //     userId: 3,
  //     goalId: 2,
  //     title: "Report some peeps",
  //     startTime: new Date(2021,2,6,8,0,0),
  //   },
  //   {
  //     sessionId: 4,
  //     userId: 4,
  //     goalId: 1,
  //     title: "Working on a project",
  //     startTime: new Date(2021,2,6,8,0,0),
  //   },
  //   {
  //     sessionId: 5,
  //     userId: 2,
  //     goalId: 1,
  //     title: "Creating music",
  //     startTime: new Date(2021,2,6,8,0,0),
  //   },
  // ]
  /* states that will need to be here / passed in
  user -> goals, friends
  sessions -> currently ongoing sessions
  */

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

      // if function inSession -> end the session and update it
      if (inSession === true) {
        updateSession(session, newSessionId)
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
          {inSession ? <InSessionBox session={session} setInSession={setInSession} goalTitle={user.goals.filter(g => g._id == session.goalId)[0].title} newSessionId={newSessionId}/>
          : <SessionBox user={user} session={session} setSession={setSession} setInSession={setInSession} setNewSessionId={setNewSessionId}/>}
        </div>
      </div>
    </div>
  )
}

export default Ocean;