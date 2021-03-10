import React from 'react'
import {useEffect} from 'react'
import './decor.css'
import coral from '../images/coral.png'
import squidwardHouse from '../images/squidward-house.png'

let decorArr = [squidwardHouse, coral];
let title = null;
let tasks = null;

const Decor = ({goal, count}) => {

    useEffect(() => {

    }, []) //


    return (
        <div >
            <img src={decorArr[count]} className="decoration"/>
            <div className = "hideGoalContent">
                <p>{goal.title}</p>
                <p> Tasks: </p>
                <ul>
                    {goal.tasks.map (task => 
                        <li>{task.task}</li>
                    )}
                </ul>

                

            </div>
        </div>
    )


}

export default Decor;