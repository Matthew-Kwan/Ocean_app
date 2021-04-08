import './App.css';
import React, { useState, useEffect } from 'react'

// import components
import Ocean from './components/Ocean/Ocean'
import Tank from './components/Tank/Tank'
import Profile from './components/Profile/Profile'
import YourProfile from './components/Profile/YourProfile'
import AdminDashboard from './components/Admin/AdminDashboard'
import OtherTank from './components/Tank/OtherTank';

// import actions
import { getUsers, addUser, checkSession } from "./actions/users.js";
import { login, logout } from "./actions/login";

// import materialUI components
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';

import './components/Tank/modal.css'
import './components/Nav/nav.css'
import './components/login.css'

import './components/Profile/profile.css'


// import React Router
import { Route, Switch, NavLink,Link, Redirect, BrowserRouter ,useParams} from 'react-router-dom'

// hardcoded data


// helper functions

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const LoginModule = ({loggedIn,handleLogin,setSignUp,classes}) => {


  const handleSignUp = () => {
    setSignUp(true)
  }
  if (loggedIn) {
    return (
      <div></div>
    )
  } else {
    return (
      <div id='loginbody'>
            <Card id='loginModule' className={classes.root}>
                <CardContent>
                    <h3>
                    Dive into Ocean</h3>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleLogin}>
                        <div className = 'input' id="username-input">
                        <TextField required id="outlined-basic" size='small' label="Username" variant="outlined" /></div>
                        <div className= 'input' id="password-input">
                        <TextField required name="" id="outlined-basic" size='small' label="Password" type="password" variant="outlined" /></div>
                          <Button type='submit' variant="contained" color="primary">
                              Login
                          </Button>

                          <p id='#loginText'>If you don't have an account, create one <span id="switchLogin" onClick={() => handleSignUp()}>here</span></p>
                    </form>

          </CardContent>

        </Card>
      </div>)

  }
}

const SignUpModule = ({loggedIn,handleRegister,setSignUp,classes}) => {


  const handleSignUp = () => {
    setSignUp(false)
  }
  if (loggedIn) {
    return (
      <div></div>
    )
  } else {
    return(
      <div id='loginbody'>
            <Card id='loginModule' className={classes.root}>
                <CardContent>
                    <h3>
                    Dive into Ocean</h3>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleRegister}>
                        <div className = 'input' id="name-input">
                        <TextField required id="outlined-basic" size='small' label="Name" name="email" variant="outlined" /></div>
                        <div className = 'input' id="username-input">
                        <TextField required id="outlined-basic" size='small' label="Username" name="username" variant="outlined" /></div>
                        <div className= 'input' id="password-input">
                        <TextField required name="password" id="outlined-basic" size='small' label="Password" type="password" variant="outlined" /></div>
                        <span>
                          <Button type='submit' variant="contained" color="primary">
                              Sign Up
                          </Button>
                          <p> <br></br>If you already have an account, login <span id="switchLogin" onClick={() => handleSignUp()}>here</span></p>
                        </span>
                    </form>

                </CardContent>
                </Card>
            <img className="illustration"></img>
      </div> )

  }
}
const NavBar = ({ loggedIn, handleLogout, user, setUser }) => {


  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    console.log(modalOpen)
  }, [modalOpen])


  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () =>  {
    setModalOpen(false)
  };


  if (loggedIn) {
    return (
      <div id="navBar">
        <Modal open={modalOpen} onClose={handleModalClose} useNativeDriver={true}>
          <YourProfile user ={user} setUser={setUser}/>
        </Modal>
        <NavLink activeClassName='activeLink' className="link btn-1" to="/ocean">
          <svg>
            <circle cx="50%" cy="50%" r="50%" width="100%" height="100%" stroke="white" stroke-width="3" />
          </svg>ocean</NavLink>
        <NavLink activeClassName='activeLink' className="link btn-1" to="/tank">
          <svg>
            <circle cx="50%" cy="50%" r="50%" width="100%" height="100%" stroke="white" stroke-width="3" />
          </svg>tank</NavLink>

        <a className="link btn-1" onClick={() => handleModalOpen()}>
          <svg>
            <circle cx="50%" cy="50%" r="50%" width="100%" height="100%" stroke="white" stroke-width="3" />


          </svg>Your Profile

        </a>

        <Modal open={modalOpen} onClose={handleModalClose}>
            <YourProfile user ={user} setUser={setUser}/>
        </Modal>

        { user.adminFlag? <Link className="link btn-1" to="/admin">
          <svg>
            <circle cx="50%" cy="50%" r="50%" width="100%" height="100%" stroke="white" stroke-width="3" />
          </svg>
          admin</Link> : null }

        { loggedIn ? <Link className="link btn-1" to="/" onClick={handleLogout}>
         <svg>
            <circle cx="50%" cy="50%" r="50%" width="100%" height="100%" stroke="white" stroke-width="3" />
          </svg>logout </Link> : null}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

function App() {
  // React states

  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})

  const [sessions, setSessions] = useState([])

  const [loggedIn, setLoggedIn] = useState(false)

  const [signUp, setSignUp] = useState(false)

  const classes = useStyles();


  // GET Request
  useEffect(() => {
    getUsers(setUsers)
    // setUsers(usersList)
  }, []) //


  useEffect(() => {
    console.log('users updated', users)
    // setUsers(usersList)
  }, [users]) //


  // login function - Modify to work with backend
  const handleLogin = async (e) => {
    e.preventDefault()

    const username = document.querySelector('#username-input').children[0].children[1].children[0].value
    const password = document.querySelector('#password-input').children[0].children[1].children[0].value

    try {
      await login(username,password,setUser)
      setLoggedIn(true)

    } catch (err) {
      // might want to modify a message that appears the user when the login fails
      console.log(err)
    }

    // filter users for user
    // const returnedUsers = users.filter(user => user.username === username && user.password === password)

    // if (returnedUsers.length === 1) {
    //   setUser(returnedUsers[0])
    //   setLoggedIn(true)
    //   // TODO: show a login notificataion for the user under the login form
    // } else {
    //   // TODO: Show an error message for the user
    //   console.log("Incorrect username and password")
    // }
  }

  // CHANGE IN PHASE 2, FOR NOW AUTO LOGS YOU IN AS THE FIRST USER IN THE HARDCODED DATA
  const handleRegister = (e) => {
    e.preventDefault()
    console.log("handle register reached")
    const name = document.querySelector('#name-input').children[0].children[1].children[0].value
    const username = document.querySelector('#username-input').children[0].children[1].children[0].value
    const password = document.querySelector('#password-input').children[0].children[1].children[0].value

    console.log(name, username, password)

    const usernameExists = users.filter(user => user.username === username)

    console.log(usernameExists)

    if (usernameExists.length === 0) {
      const user = {id: 1, username: username, password: password, adminFlag: false, name: name, tagline: "", goals: [], friends: [], sessions: []}

      addUser(user)
      .then(
        (result) =>
        {console.log("here", result)
          setUser(result)
        setLoggedIn(true)})

    }
    else
      console.log("username already exists")
    //setUser(users[0])
  }

  // logout function
  const handleLogout = (e) => {

    logout(setUser)
    setLoggedIn(false)

    // logout(setUser)
    // .then((res) => {
    //   console.log('first then')
    //   setLoggedIn(false)
    //   return res
    // })
    // .catch((err) => {
    //   console.log(err)
    // })

  }

  return (

    <BrowserRouter>
      <div>
        <NavBar loggedIn={loggedIn} handleLogout={handleLogout} user={user} setUser={setUser} />
      </div>

      <Switch>
        <Route path="/ocean" render={() => {
          // will need this to redirect to login page if the user is not logged in
          return (
            <Ocean user={user} setUser={setUser} users={users} sessions={sessions} setSessions={setSessions} setLoggedIn={setLoggedIn} />
          )
        }} />

        <Route path="/profile" render={() => {

          return (
            <Profile mainUser={user} user={users[1]} setUser={setUser} />
          )
        }} />

        <Route path="/admin" render={() => {

          return (
            <AdminDashboard users={users} sessions={sessions} setUsers={setUsers} />
          )
        }} />

        <Route path="/yourprofile" render={() => {

          return (
            <YourProfile user={user} setUser={setUser} />
          )
        }} />

        <Route path="/tank/:id" render={() => {
          return (
            <OtherTank users={users} />
          )
        }} />

        <Route path="/tank" render={() => {
          return (
            <Tank user={user} setUser={setUser}/>
          )
        }} />

        <Route path="/">
          {loggedIn ? <Redirect to="/ocean" /> : null}
        </Route>


      </Switch>

      { signUp ? <SignUpModule loggedIn={loggedIn} handleRegister={handleRegister} setSignUp={setSignUp} classes={classes}></SignUpModule> : <LoginModule loggedIn={loggedIn} handleLogin={handleLogin} setSignUp={setSignUp} classes={classes}></LoginModule>}

    </BrowserRouter>
  );
}

export default App;
