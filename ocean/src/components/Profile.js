import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import './profile.css'
import Editable from './Editable'
import EditMe from './editMe'

import ContentEditable from 'react-contenteditable'

// class MyComponent extends React.Component {
//     constructor() {
//       super()
//       this.contentEditable = React.createRef();
//       this.state = {html: "<b>Hello <i>World</i></b>",
//         editable: true};
//     };
  
//     handleChange = evt => {
//       this.setState({html: evt.target.value});
//     };
  
//     render = () => {
//       return <ContentEditable
//                 innerRef={this.contentEditable}
//                 html={this.state.html} // innerHTML of the editable div
//                 disabled={false}       // use true to disable editing
//                 onChange={this.handleChange} // handle innerHTML change
//                 tagName='article' // Use a custom HTML tag (uses a div by default)
//               />
//     };
//   };
const teest = ""
  
const Profile = ({user,setUser}) => {
    return (
        <div className="profCard">
            <div className='profHeader'>
                <div className="profImg"></div>
                <div id='profText'>
                    {EditMe(user,setUser,"name")}
                    {EditMe(user,setUser,"tagline")}
                </div>

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
                {/* <h3>Friends</h3>
                <div id='friends'>
                    {
                        (user.friends).map(friend => (
                        <div class='friend'>
                            <img class='profImg'></img>
                            <p>{friend.name}</p>
                        </div>)) 
                    }
                  
                </div> */}
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



export default Profile;