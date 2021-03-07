import React  from 'react'

import './profile.css'

import './modal.css'

import EditMe from './editMe'



const YourProfile = ({user, setUser}) => {
    return (
        <div className="profCard modalContainer">
            <h2> Your Profile</h2>
            <div className='profHeader'>
                <div className="profImg"></div>
                <div id='profText'>
                    {EditMe(user,setUser,"name")}
                    {EditMe(user,setUser,"tagline")}
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
                <h3>Recently Completed Sessions</h3>
                <ol>
                    <li>Read Book</li>
                    <li>Finish CSC309 Project</li>
                </ol>
            </div>
        </div>
    )
}



export default YourProfile;