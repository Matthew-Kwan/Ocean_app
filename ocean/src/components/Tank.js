import React from 'react'
import {useEffect} from 'react'
import './tank.css'
import GoalsDrawer from './GoalsDrawer'
import Fish from './Fish'
import Decor from './Decor'


let counter = 2;
let decorCount = 0;

const Tank= ({user}) => {

    const [sessions, setSessions] = React.useState([]);
    const [goals, setGoals] = React.useState(user.goals);
    //const [decorCount, setDecorCount] = React.useState(0);

    useEffect(() => {
        const tmpSessions = user.sessions.filter(session => session.endTime !== null)
        setSessions(tmpSessions);

        return function cleanup() {
            counter = 4-sessions.length;
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

        if (decorCount > 1)
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

                <GoalsDrawer goals={user.goals} refreshGoals={refreshGoals}/>

                <ul id="fishListTank">
                    {sessions.map(session => handleFish(session))}
                </ul>

                <div className='decorContent'>

                    {goals.map(goal => handleGoal(goal))}
                </div>


            </div>
            <div className="tankBottom"></div>



    </div>

    )
}

export default Tank;