import React, {useState, useEffect} from 'react'
import { Button, colors } from '@material-ui/core';
import './profile.css'
import './modal.css'
import EditMe from './editMe'
import {Link} from 'react-router-dom'
import Modal from '@material-ui/core/Modal'
import {addReport} from '../actions/reports'

const Profile = ({mainUser, user, setUser}) => {

    const submitReport = (e) => {
        e.preventDefault()

        console.log('submitting report here')

        setReported(true)
        setOpenReportModal(false);
        let title = document.getElementById("reportReason").value;
        // var value = e.options[e.selectedIndex].value;
        const newReport = {
            "reportedBy": "PLEASE REPLACE MEEEE" ,
            "reportedUser":  "report user ID - will be replaaced"  ,
            "title":  title,
            "resolved": false,
        }
        addReport(newReport)


    }

    const ReportModal = () => (
    
    <div className ="modalContainer">
        <div className = 'modalContent'>
          <h3 >Why are you reporting this user?</h3>
         
          
            <form onSubmit= {submitReport}>

            <select id="reportReason" name="reportReason">
                <option value="profanity">Profanity</option>
                <option value="hate speech">Hate Speech</option>
                <option value="inappropriate">General Inappropriateness</option>
                <option value="other">Other</option>
            </select>
            <br></br>
            <br></br>
            <input type="submit"/>

            </form>
        </div>

    </div>)

    

    function AddFriend(mainUser,user, setUser) {
        console.log('adding friend')
        // add user to friends
        let newFriends = mainUser.friends
        newFriends.push({id:user.id, name: user.name})
        setUser({...mainUser, friends: newFriends})
        // send out put/patch request to friends
    }

    const isFriend = mainUser.friends.filter(friend => friend.id == user.id).length > 0 ? true: false

    const [reported, setReported] = useState(false)
    const [openReportModal, setOpenReportModal] = React.useState(false);

    const handleReportModalOpen = () => { //open Report modal
        setOpenReportModal(true);
      };

    const handleReportModalClose = () => {
        setOpenReportModal(false);
    }
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
                {/* Profile Actions */}
                <Button variant="contained" color="primary">  <Link id = "linkButton" color="white" to={
                    {
                      pathname: `/tank/${user.id}`
                    }}>View Tank</Link></Button> 
                
                {(isFriend) ? <div className='centerText'>Friend has been added</div> : <Button variant="contained" color="primary" onClick = {() => AddFriend(mainUser, user, setUser)}>
                    Add Friend
                    </Button>}
                {(!reported)?
                    <Button color="secondary" onClick = {handleReportModalOpen}> Report </Button> : <Button color="secondary" disabled={true}>Reported</Button>}
                    <Modal open={openReportModal} onClose={handleReportModalClose} >
                         {ReportModal()}
                         
                     </Modal>
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