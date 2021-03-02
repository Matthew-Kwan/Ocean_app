import React from 'react'
import './tank.css'
import GoalsDrawer from './GoalsDrawer.js'



const Tank= () => {

    return (
        
        <div className="tank">

            
                <div className="tankTop"></div>


                <div className="tankContent">


                    <GoalsDrawer></GoalsDrawer>

                </div>
                
                <div className="tankBottom"></div>



        </div>

        
        
    )
}

export default Tank;