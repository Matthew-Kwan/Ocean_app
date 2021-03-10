import React from 'react'
import {useEffect} from 'react'
import './tank.css'
import GoalsDrawer from './GoalsDrawer'
import Fish from './Fish'
import Decor from './Decor'


let counter = 2;

const Tank= ({user}) => {

    const [sessions, setSessions] = React.useState([]);
    const [goals, setGoals] = React.useState(user.goals);

    useEffect(() => {
        const tmpSessions = user.sessions.filter(session => session.endTime !== null)
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

                <GoalsDrawer goals={user.goals} refreshGoals={refreshGoals}/>

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

export default Tank;