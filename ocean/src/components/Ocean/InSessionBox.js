import React, { useState, useEffect, useRef } from 'react'

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

// import actions
import { updateSession } from '../../actions/sessions'

const InSessionBox = ({session, setInSession, goalTitle="No Goal Selected", newSessionId}) => {

  const [timer, setTimer] = useState(0)
  const increment = useRef(null)

  useEffect(() => {
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }, [])

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  const handleEndSession = () => {
    clearInterval(increment.current)
    setTimer(0)
    setInSession(false)

    const endSession = session
    endSession.endTime = new Date()

    // PUT request
    updateSession(endSession, newSessionId)

  }
  // send a put request to session table to add the end time for finished session

  return (
    <Container>
      <p className = "sessionLabel"> SESSION IN PROGRESS </p>
      <div className="sessionInfo">
        <p> You're currently working on: </p>
        <h2> {session.title} </h2>
      </div>
      <div className="sessionInfo">
        <p> For the goal: </p>
        <h2> {goalTitle} </h2>
      </div>
      <div className="sessionInfo">
        <p> Elapsed Time: </p>
        <h2> {formatTime(timer) } </h2>
      </div>
      <Button type="submit" onClick={handleEndSession} variant="outlined" color="red">
          End Session
        </Button>
    </Container>
  )
}

export default InSessionBox;