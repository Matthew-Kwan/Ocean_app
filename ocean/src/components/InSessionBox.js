import React, { useState, useEffect, useRef } from 'react'

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const InSessionBox = ({session, setInSession}) => {

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
  }

  return (
    <Container>
      <h3> Session In Progress </h3>
      <h1> Currently working on: {session.title} </h1>
      <h3> Goal: {session.goal} </h3>
      <p>{ formatTime(timer) }</p>
      <Button type="submit" onClick={handleEndSession} variant="outlined" color="red">
          End Session
        </Button>
    </Container>
  )
}

export default InSessionBox;