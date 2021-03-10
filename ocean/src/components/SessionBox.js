import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SessionBox = ({ user, session, setSession, setInSession }) => {

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
      <h3> Start a new Session </h3>
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
            {user.goals.map((option) => (
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


export default SessionBox;