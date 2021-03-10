import React from 'react'
import {useEffect} from 'react'
import './decor.css'
import coral from '../images/coral.png'
import squidwardHouse from '../images/squidward-house.png'

let decorArr = [squidwardHouse, coral];

const Decor = ({goal, count}) => {

    useEffect(() => {

    }, []) //


    return (
        <div className= "decorationDiv">

            <img src={decorArr[count]} className="decoration"/>

            <div className = "hideGoalContent">
                <div className = "goalContent">
                    <p className ="bold">{goal.title}</p>
                    <p className = "bold"> Tasks: </p>
                    <ul>
                        {goal.tasks.map (task => 
                            <li>{task.task}</li>
                        )}
                    </ul>
                </div>
            </div>

        </div>
    )


}

export default Decor;