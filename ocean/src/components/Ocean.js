import React, { useState, useEffect, useRef } from 'react'
import './ocean.css'

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const goals = [
  {
    id: 1,
    title: 'Software'
  }, {
    id: 2,
    title: 'School'
  }
]


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

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
      <h1> Session In Progress </h1>
      <h1> Title: {session.title} </h1>
      <h3> Goal: {session.goal} </h3>
      <p>{ formatTime(timer) }</p>
      <Button type="submit" onClick={handleEndSession} variant="outlined" color="red">
          End Session
        </Button>
    </Container>
  )
}

const SessionBox = ({ session, setSession, setInSession }) => {

  /* session: object with
    - title
    - duration
    - goal
    - user (maybe not since goal is already linked)
  */

  const classes = useStyles();

  // on mount refresh the session state
  // useEffect(() => {
  //   this.setSession({
  //     title: '',
  //     goal: '',
  //   })
  // }, [])


  // placeholder, this will probably be put into a custom hook (ref FSO 7.2)
  const handleChange = (e) => {
    e.preventDefault()
    const value = e.target.value
    setSession({
      ...session,
      [e.target.name]: value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setInSession(true)
  }


  return (
    <Container>
      <h1> Session </h1>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
            className="session-form-input"
            label="Title"
            name="title"
            helperText="Please enter a title for your session"
            value={session.title}
            onChange={handleChange}
          >
          </TextField>

        <TextField
            className="session-form-input"
            select
            label="Goal"
            name="goal"
            value={session.goal}
            onChange={handleChange}
            helperText="Please select a goal"
          >
            {goals.map((option) => (
              <MenuItem key={option.id} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
        </TextField>

        <Button type="submit" variant="outlined" color="primary">
          Start Session
        </Button>
      </form>

    </Container>
  )
}

// Create some sort of mapping of session data onto fishes that just swim around the ocean

const Fish = (session) => {
  return (
    <h1>Fish</h1>
  )
}

const Ocean = ({user, setUser}) => {

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
          {inSession ? <InSessionBox session={session} setInSession={setInSession}/> : <SessionBox session={session} setSession={setSession} setInSession={setInSession}/>}
        </div>
      </div>
    </div>
  )
}

export default Ocean;