import React from 'react'
import { Button } from '@material-ui/core';
import './profile.css'

const Profile = ({user}) => {
    return (
        <div className="profCard">
            <div className='profHeader'>
                <div className="profImg"></div>
                <h2>{user.name}</h2>

            </div>
            <div className = 'profButtons'>
                <Button variant="contained" color="primary">View Tank</Button>


                <Button variant="contained" color="primary">
                    Add Friend
                    </Button>
                <Button color="secondary">
                    Report
                    </Button>
            </div>

            <div>
                <h3>Recently Completed Goals</h3>
                <ol>
                    <li>Read Book</li>
                    <li>Finish CSC309 Project</li>
                </ol>
            </div>
        </div>
    )
}

export default Profile;