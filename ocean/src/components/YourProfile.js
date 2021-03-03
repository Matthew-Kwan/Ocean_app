import React from 'react'
import { Button } from '@material-ui/core';
import './profile.css'


const friends = []

const YourProfile = ({user}) => {
    return (
        <div className="profCard">
            <div className='profHeader'>
                <div className="profImg"></div>
                <div id='profText'>
                    <h2>{user.name}</h2>
                    <p>24, 🇨🇦</p>
                </div>

            </div>
            <div >
                <h3>Friends</h3>
                <div id='friends'>
                    {
                        (user.friends).map(friend => (
                        <div class='friend'>
                            <img class='profImg'></img>
                            <p>{friend.name}</p>
                        </div>)) 
                    }
                  
                </div>
            </div>

            <div>
                <h3>Recently Completed Goals</h3>
                <ol>
                    <li>Read Book</li>
                    <li>Finish CSC309 Project</li>
                </ol>
            </div>
            <h3>Recently Completed Sessions</h3>
                <ol>
                    <li>Read Book</li>
                    <li>Finish CSC309 Project</li>
                </ol>
        </div>
    )
}

export default YourProfile;