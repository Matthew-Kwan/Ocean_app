import React, { useState, useEffect, useRef } from 'react'
import './fish.css'

const Fish = ({session}) => {
  const d = new Date()
  console.log(Math.abs(d-session.startTime)/(1000))
  const [timer, setTimer] = useState(Math.abs(d - session.startTime)/1000)
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

  return (
    <div className='fish'>
      <h1>{session.title}</h1>
      <p>{ formatTime(timer) }</p>
    </div>
  )
}

export default Fish;