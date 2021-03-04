import React from 'react'
import { Button } from '@material-ui/core';
import './profile.css'

import './modal.css'
import ProgressBar from './ProgressBar'
import ButtonModal from './ButtonModal'

const friends = []

const YourProfile = ({user}) => {
    return (
        <div className="profCard modalContainer">
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

// function removeFriend(e){
// 	e.preventDefault();
// 	// check if return button was clicked, otherwise do nothing.
// 	if (e.target.classList.contains('return')) {
// 		log('remove Friend button clicked')
// 		const bookRow = e.target.parentElement.parentElement
// 		const returnBookId = parseInt(bookRow.firstElementChild.firstChild.nodeValue)
// 		// Call removeBookFromPatronTable()
// 		removeBookFromPatronTable(libraryBooks[returnBookId])


// 		// Change the book object to have a patron of 'null'
// 		libraryBooks[returnBookId].patron = null
// 	}

// }

// function removeFriendFromUserFriends(book) {
// 	// Add code here
// 	log('patron')
// 	log(book.patron)

// 	const rows = patronEntries.children[book.patron.cardNumber].lastElementChild.tBodies[0].querySelectorAll('tr')

// 	for (i = 0; i < rows.length; i++) {
// 		if (rows[i].firstElementChild.firstChild.nodeValue == book.bookId){
// 			rows[i].remove();
// 			// log('trigered')
// 			// // log(rows[i].children[2].firstElementChild.textContent)
// 			// rows[i].children[2].firstElementChild.textContent = 'Overdue'
// 			// rows[i].children[2].firstElementChild.className = 'red'
// 		}
// 	  }

// 	// update library book table

// 	const bookTableTbody = bookTable.firstElementChild
// 	const trows = bookTableTbody.querySelectorAll('tr')

// 	for (i = 0; i < trows.length; i++) {
// 		if (trows[i].firstElementChild.firstChild.nodeValue == book.bookId){
// 			log('trigered')
// 			log(trows[i].children[2])
// 			trows[i].children[2].firstChild.nodeValue = ""
// 			// rows[i].children[2].firstElementChild.className = 'red'
// 		}
// 	}

// }


export default YourProfile;