import React  from 'react'
import Modal from '@material-ui/core/Modal'
import './profile.css'

import '../Tank/modal.css'


import EditMe from './editMe'


const YourProfile = ({user, setUser}) => {


    return (
        <div className="profCard modalContainer">
            <h2> Your Profile </h2>
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
                        <div className='friend'>
                            <img className='profImg'></img>
                            <p>{friend.name}</p>
                        </div>)) 
                    }
                </div>
            </div>
            <div>
                <h3>Recently Completed Goals</h3>
                <ol>
                        {
                        (user.goals).map(goal => (
                            <li>{goal.title}</li>
                        )) 
                    }
                </ol>
                <h3>Recently Completed Sessions</h3>
                <ol>
                {
                        (user.sessions).map(goal => (
                            <li>{goal.title}</li>
                        )) 
                    }
                </ol>
            </div>
        </div>
    )
}



export default YourProfile;