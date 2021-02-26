import React, { useState, useEffect } from 'react'
import './ocean.css'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
  const classes = useStyles()
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
    <div>
      <h1> Session </h1>
      <FormControl className={classes.formControl}>
        {/*Need to add value and onChange to this*/}
        <InputLabel id="goal-select-label">Goal</InputLabel>
        <Select
          labelId="goal-select-label"
          id="goal-select"
          value={goal}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

const Ocean = ({user, setUser}) => {

  return (
    <div className="ocean">
      <div>
        <h1>Ocean</h1>
      </div>

      <div className="oceanContent">
        {/*other fish*/}
        <div className="currentSessionBox">
          <h1>Current Sessions</h1>
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