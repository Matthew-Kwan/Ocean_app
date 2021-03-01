import React, { useState, useEffect } from 'react'
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

const SessionBox = () => {

  /* session: object with
    - title
    - duration
    - goal
    - user (maybe not since goal is already linked)
  */

  const [session, setSession] = useState({})
  const [goal, setGoal] = useState({})

  // on mount refresh the session state
  useEffect(() => {
    setSession({})
    setGoal({})
  }, [])


  // placeholder, this will probably be put into a custom hook (ref FSO 7.2)
  const handleChange = (event) => {
    setGoal(event.target.value);
  };


  return (
    <Container>
      <h1> Session </h1>
      <TextField
          className="session-form-input"
          label="Title"
          helperText="Please enter a title for your session"
        >
          {goals.map((option) => (
            <MenuItem key={option.id} value={option.title}>
              {option.title}
            </MenuItem>
          ))}
        </TextField>

      <TextField
          className="session-form-input"
          select
          label="Goal"
          value={goal}
          onChange={handleChange}
          helperText="Please select a goal"
        >
          {goals.map((option) => (
            <MenuItem key={option.id} value={option.title}>
              {option.title}
            </MenuItem>
          ))}
        </TextField>

      <Button variant="outlined" color="primary">
        Start Session
      </Button>


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
  return (
    <div className="ocean">
      <div>
        <h1>Ocean</h1>
      </div>

      <div className="oceanContent">
        {/*other fish*/}
        <div className="currentSessionBox">
          <h1>Current Sessions</h1>
          <Fish/>
        </div>
        {/*absolute position for session box*/}
        <div className="sessionBox">
          <SessionBox/>
        </div>
      </div>
    </div>
  )
}

export default Ocean;