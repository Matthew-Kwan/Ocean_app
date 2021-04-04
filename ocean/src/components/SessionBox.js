import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import './ocean.css'

// import actions
import { addSession } from '../actions/sessions'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SessionBox = ({ user, session, setSession, setInSession, setNewSessionId}) => {

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
    const newSession = session

    newSession.startTime = new Date()

    // send post request to create a session here
    addSession(newSession)
    .then((id) => {
      setNewSessionId(id)
    })
    setInSession(true)
  }

  // send post request to server, adding the current active session to all sessions table

  return (
    <Container className="sessionBoxContainer">
      <p className="sessionLabel"> Start a new Session </p>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
            className="session-form-input sessionInput"
            label="Title"
            name="title"
            helperText="Please enter a title for your session"
            value={session.title}
            onChange={handleChange}
          >
          </TextField>

        <br></br>

        <TextField
            className="session-form-input sessionInput"
            select
            label="Goal"
            name="goalId"
            value={session.goalId}
            onChange={handleChange}
            helperText="Please select a goal"
          >
            {user.goals.map((option) => (
              <MenuItem key={option.id} value={option._id}>
                {option.title}
              </MenuItem>
            ))}
        </TextField> <br></br>

        <Button type="submit" variant="outlined" color="primary">
          Start Session
        </Button>
      </form>

    </Container>
  )
}


export default SessionBox;