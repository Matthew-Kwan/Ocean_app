import React from 'react'
import './tank.css'
import GoalsDrawer from './GoalsDrawer'

console.log("hello")

const Tank= () => {

    return (
        
        <div className="tank">


                <div className="tankContent">


                    <GoalsDrawer/>

                </div>
                
                <div className="tankBottom"></div>



        </div>
   
    )
}

export default Tank;