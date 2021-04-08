import React from 'react'
import {useEffect} from 'react'
import './tank.css'
import GoalsDrawer from '../Goals/GoalsDrawer'
import Fish from '../Ocean/Fish'
import Decor from './Decor'

import { getUser } from '../../actions/users.js'

let counter = 2;
let decorCount = 0;

const Tank= ({user, setUser}) => {

    const [sessions, setSessions] = React.useState([]);
    const [goals, setGoals] = React.useState(user.goals);
    //const [decorCount, setDecorCount] = React.useState(0);

    useEffect(() => {
        console.log('USER: ', user)
        const tmpSessions = user.sessions.filter(session => session.endTime !== null)
        setSessions(tmpSessions);

        getUser(user._id)
        .then((result) => {
            console.log('get user',result)
        })
        
        return function cleanup() {
            counter = 4-sessions.length;
            decorCount = 0;
        }
    }, []);

    const refreshGoals = (updatedGoals) => {
        setGoals(updatedGoals);
    }

    const handleFish = (session) => {
        session = {...session, counter: counter}
        counter = counter + 1
        return (
            <li key={session.id} className="fishListTankItem"><Fish session={session} fishType="tank"/></li>
        )
    }

    const handleGoal = (goal) => {
        //setDecorCount(decorCount+1)
        decorCount++;

        if (decorCount > 19)
            decorCount = 0;

        return (
            <div className = "decorationSlot">
                {goal.completed?
                    <Decor goal={goal} count={decorCount}/>
                :<div></div>}
            </div>
        )
    }

    return (

        <div className="tank">

            <div className="tankContent">

                <GoalsDrawer goals={user.goals} user={user} setUser={setUser} setGoals={setGoals} refreshGoals={refreshGoals}/>

                <ul id="fishListTank">
                    {sessions.map(session => handleFish(session))}
                </ul>

                <div className='decorContent'>
                    <div className = 'decorRow'>
                        {goals.map(goal => handleGoal(goal))}
                    </div>
                </div>


            </div>
            <div className="tankBottom"></div>



    </div>

    )
}

export default Tank;