import React, {useState, useEffect} from 'react'
import { Button, colors } from '@material-ui/core';
import './profile.css'
import './modal.css'
import EditMe from './editMe'
import {Link} from 'react-router-dom'

const Profile = ({mainUser, user, setUser}) => {

    function AddFriend(mainUser,user, setUser) {
        console.log('adding friend')
        // add user to friends
        let newFriends = mainUser.friends
        newFriends.push({id:user.id, name: user.name})
        setUser({...mainUser, friends: newFriends})
    }

    const isFriend = mainUser.friends.filter(friend => friend.id == user.id).length > 0 ? true: false

    const [reported, setReported] = useState(false)


    return (
        <div className="profCard modalContainer">
            <div className='profHeader'>
                <div className="profImg"></div>
                <div id='profText'>
                    <h2 className="profName">{user.name}</h2>
                    {user.tagline? <p>{user.tagline}</p> : null}
                    
               
                </div>

            </div>
            <div className = 'profButtons'>
            
                <Button variant="contained" color="primary">  <Link id = "linkButton" color="white" to={
                    {
                      pathname: `/tank/${user.id}`
                    }
                  }>View Tank</Link></Button> 
                
                {(isFriend) ? <div className='centerText'>Friend has been added</div> : <Button variant="contained" color="primary" onClick = {() => AddFriend(mainUser, user, setUser)}>
                    Add Friend
                    </Button>}
                {(!reported)?
                    <Button color="secondary" onClick = {() => {setReported(true)}}> Report </Button> : <Button color="secondary" disabled={true}>Reported</Button>}

            </div>
            <div>
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



export default Profile;