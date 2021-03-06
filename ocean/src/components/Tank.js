import React from 'react'
import {useEffect} from 'react'
import './tank.css'
import GoalsDrawer from './GoalsDrawer'
import Fish from './Fish'


const Tank= ({user}) => {

    const [sessions, setSessions] = React.useState([]);

    useEffect(() => {
        const tmpSessions = user.sessions.filter(session => session.endTime !== null)
        setSessions(tmpSessions);
        console.log(sessions)
      }, []);

    return (
        
        <div className="tank">


                <div className="tankContent">


                    <GoalsDrawer goals={user.goals}/>
                    <div className="currentSessionBox">
                        <h1>Tank</h1>
                            {sessions.map(session => 
                                <Fish session={session}/>)}
                    </div>

                </div>
                
                <div className="tankBottom"></div>



        </div>
   
    )
}

export default Tank;