import React from 'react'
import {useEffect} from 'react'
import './tank.css'
import GoalsDrawer from '../Goals/GoalsDrawer'
import Fish from '../Ocean/Fish'
import Decor from './Decor'

import { getUser } from '../../actions/users.js'
import { getSessions, updateSession } from '../../actions/sessions'

let counter = 0;
let decorCount = 0;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    counter = 1;
    console.log("DEV")
  } else {
    // production code
    counter = 4;
    console.log("PROD")
  }

const Tank= ({user, setUser, sessions, setSessions}) => {

    const [goals, setGoals] = React.useState(user.goals);
    const [currentSessions, setCurrentSessions] = React.useState([])
    //const [decorCount, setDecorCount] = React.useState(0);

    useEffect(() => {
        console.log("HERERERE")
        decorCount = 0;
        getSessions(setSessions)

        // console.log("sessionssss", sessions)

        // let currSess = sessions.filter((s) => s.hasOwnProperty("endTime"))
        // console.log("currsess", currSess)
        // setCurrentSessions(currSess)

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // dev code
            counter = 1;
            console.log("DEV")
        } else {
            // production code
            counter = 4;
            console.log("PROD")
        }

        return function cleanup() {
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                // dev code
                counter = 4-sessions.length;
                console.log("DEV")
              } else {
                // production code
                counter = 4;
                console.log("PROD")
              }
            decorCount = 0;
        }
    }, []);

    useEffect(() => {
        console.log('session useEffect tank run')
    
        // if endTime is not defined, then that means that the session is still in progress
        let currSess = sessions.filter((s) => s.hasOwnProperty("endTime"))
    
        console.log("completed sess", currSess)
    
        // HARDCODE: limits the number of fish to 3
        if (currSess.length > 3) {
          console.log(currSess.length)
          currSess = currSess.slice(currSess.length-3,currSess.length)
        }
        setCurrentSessions(currSess)
        decorCount = 0;
      }, [sessions])

      useEffect(() => {
        decorCount = 0;
      }, [goals])

    const refreshGoals = (updatedGoals) => {
        setGoals(updatedGoals);
    }

    const handleFish = (session) => {
        //console.log("HERE", sessions)
        session = {...session, counter: counter}
        counter = counter + 1

        return (
            <li key={session.id} className="fishListTankItem"><Fish session={session} fishType="tank"/></li>
        )
    }

    const handleGoal = (goal) => {
        //setDecorCount(decorCount+1)

        if (decorCount > 19)
            decorCount = 0;

        decorCount++;

        var decorName = "decor"+decorCount
        console.log(decorName)

        return (
            <div className = {decorName}>
                {goal.completed?
                    <Decor goal={goal} count={decorCount}/>
                :<div></div>}
            </div>
        )
    }

    const resetDecorCount = () => {
        decorCount = 0;
    }

    return (

        <div className="tank">

            <div className="tankContent">

                <GoalsDrawer goals={user.goals} user={user} setUser={setUser} setGoals={setGoals} refreshGoals={refreshGoals}/>

                <ul id="fishListTank">
                    {currentSessions.map(session => handleFish(session))}
                </ul>

                {resetDecorCount()}

                <div className='decorContent'>
                    {goals.map(goal => handleGoal(goal))}
                </div>


            </div>
            <div className="tankBottom"></div>



    </div>

    )
}

export default Tank;