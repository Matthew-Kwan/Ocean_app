import React from 'react'
import {useState, useRef} from 'react'
import {useEffect} from 'react'
import './tank.css'
import GoalsDrawer from './GoalsDrawer'
import Fish from './Fish'
import Decor from './Decor'
import { useParams } from 'react-router-dom'


let counter = 2;

const OtherTank= ({users}) => {

    const id = useRef(useParams().id)
    const [tankOwner, setTankOwner] = useState(users.filter(u => u.id == id.current)[0])
    const [sessions, setSessions] = React.useState([]);
    const [goals, setGoals] = React.useState(tankOwner.goals);

    useEffect(() => {
        console.log(tankOwner)
        const tmpSessions = tankOwner.sessions.filter(session => session.endTime !== null)
        setSessions(tmpSessions);
        return function cleanup() {
            counter = 4-sessions.length;
          }
    }, []);

    const refreshGoals = (updatedGoals) => {
        console.log(goals)
        setGoals(updatedGoals);
        console.log("goals",goals)
        console.log("updatedGoals", updatedGoals)

    }

    const handleFish = (session) => {
        session = {...session, counter: counter}
        counter = counter + 1
        return (
            <li key={session.id} className="fishListTankItem"><Fish session={session} fishType="tank"/></li>
        )
    }

    return (

        <div className="tank">

            <div className="tankContent">
                <h1> {tankOwner.name}'s Tank</h1>

                <GoalsDrawer goals={tankOwner.goals} refreshGoals={refreshGoals}/>

                <ul id="fishListTank">
                    {sessions.map(session => handleFish(session))}
                </ul>

                <div className='decorContent'>

                    <div className = "decorRow" >

                        {goals.map(goal =>
                            <div className = "decorationSlot">
                                {goal.completed?
                                    <Decor goal={goal}/>
                                :<div></div>}
                            </div>
                        )}
                    </div>

                </div>


            </div>
            <div className="tankBottom"></div>



    </div>

    )
}

export default OtherTank;