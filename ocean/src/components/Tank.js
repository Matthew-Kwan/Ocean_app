import React from 'react'
import './tank.css'
import GoalsDrawer from './GoalsDrawer'
import Fish from './Fish'

const Tank= ({user}) => {

    return (
        
        <div className="tank">


                <div className="tankContent">


                    <GoalsDrawer goals={user.goals}/>

                </div>
                
                <div className="tankBottom"></div>



        </div>
   
    )
}

export default Tank;