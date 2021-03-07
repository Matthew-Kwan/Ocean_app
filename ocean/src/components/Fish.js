import React, { useState, useEffect, useRef } from 'react'
import './fish.css'
import smallFish from './smallFish.png'

const Fish = ({users, session}) => {

  const [timer, setTimer] = useState(Math.floor(Math.abs(new Date() - session.startTime)/1000))
  const [style, setStyle] = useState(`fish${session.counter}`)
  const increment = useRef(null)
  const imageStyle = useRef('')
  const [sessionUser, setSessionUser] = useState({})

  useEffect(() => {
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)

    // WILL NEED TO CHANGE THIS FOR PRODUCTION (functions no longer called twice b/c not strict)
    if (session.counter % 2 === 0) {
      imageStyle.current = 'fishImageRight'
    } else {
      imageStyle.current = 'fishImageLeft'
    }

    // get the user for the session
    setSessionUser(users.filter(user => user.id == session.userId)[0])

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

  return (
    <div className={style}>
      <div className="fishImageDiv">
        <img src={smallFish} id={imageStyle.current} alt="session"/>
        <p className='fishUser'>{sessionUser.name}</p>
        <p className='fishTitle'>{session.title}</p>
        <p className='fishTimer'>{ formatTime(timer) }</p>
      </div>
    </div>
  )
}

export default Fish;