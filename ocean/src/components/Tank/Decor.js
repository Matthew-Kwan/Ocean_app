import React from 'react'
import {useEffect} from 'react'
import './decor.css'
import coral from '../../images/coral.png'
import squidwardHouse from '../../images/squidward-house.png'
import coralblue from '../../images/coral-blue.png'
import fishHouse from '../../images/wide_fish.png'


let decorArr = [coral, squidwardHouse,coralblue, coral, coralblue, coral, squidwardHouse, coral, squidwardHouse, coral,
                squidwardHouse, coral, squidwardHouse, coral, squidwardHouse, coral, squidwardHouse, coral, squidwardHouse, coral, squidwardHouse];

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