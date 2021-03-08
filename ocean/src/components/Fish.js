import React, { useState, useEffect, useRef } from 'react'
import './fish.css'
import smallFish from './smallFish.png'

import Profile from './Profile'
import Modal from '@material-ui/core/Modal';

const Fish = ({users, user, setUser, session, fishType}) => {

  const [timer, setTimer] = useState(Math.floor(Math.abs(new Date() - session.startTime)/1000))
  const [style, setStyle] = useState(`fish${session.counter}`)
  const increment = useRef(null)
  const imageStyle = useRef('')
  const [sessionUser, setSessionUser] = useState({})
  const [open, setOpen] = useState(false)

  useEffect(() => {
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)

    console.log(session.counter)

    // WILL NEED TO CHANGE THIS FOR PRODUCTION (functions no longer called twice b/c not strict)
    if (session.counter % 2 === 0) {
      imageStyle.current = 'fishImageRight'
      console.log("right")
    } else {
      imageStyle.current = 'fishImageLeft'
      console.log("left")
    }

    // get the user for the session
    if (fishType == "ocean")
      setSessionUser(users.filter(u => u.id == session.userId)[0])

    return function cleanup() {
      clearInterval(increment.current)
    } // haha
  }, [])


  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={style}>
      <div className="fishImageDiv">
        <img src={smallFish} id={imageStyle.current} alt="session"/>
        {fishType == "ocean"?
          <div>
            <p className='fishUser' onClick={() => handleOpen()}>{sessionUser.name}</p>
            <Modal open={open} onClose={handleClose}><Profile mainUser={user} user={sessionUser} setUser={setUser}/></Modal>
            <p className='fishTitle'>{session.title}</p>
            <p className='fishTimer'>{ formatTime(timer) }</p>
          </div>
        :
          <div></div>}
      </div>
    </div>
  )
}

export default Fish;