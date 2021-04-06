import './App.css';
import React, { useState, useEffect } from 'react'

// import components
import Ocean from './components/Ocean'
import Tank from './components/Tank'
import Profile from './components/Profile'
import YourProfile from './components/YourProfile'
import Login from './components/Login'
import AdminDashboard from './components/Admin/AdminDashboard'
import Nav from './components/NavBar'
import OtherTank from './components/OtherTank';

// import actions
import { getUsers, addUser } from "./actions/users.js";

// import materialUI components
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';

import './components/modal.css'
import './components/nav.scss'
import './components/login.css'

import './components/profile.css'
import ProgressBar from './components/ProgressBar'
import ButtonModal from './components/ButtonModal'


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
  // HARDCODED DATA: Goals, sessions, and user objects are defined here. With our backend done, we would pull these from the server
  const goals1 = [
    {
      id: 30000,
      title: 'Software',
      totalTasksNum: 2,
      completedTasksNum: 1,
      completed: false,
      completionPercent: 50,
      tasks: [
        { id: 0, task: 'Research React', completed: true },
        { id: 1, task: 'Make demo app', completed: false }
      ]
    },
    {
      id: 20000,
      title: 'School',
      totalTasksNum: 5,
      completedTasksNum: 3,
      completed: false,
      completionPercent: 60,
      tasks: [
        { id: 0, task: 'study for CSC309', completed: true },
        { id: 1, task: 'study for CSC384', completed: true },
        { id: 2, task: 'drop MIE424', completed: true },
        { id: 3, task: 'submit AI minor form request', completed: false },
        { id: 4, task: 'submit extra form request', completed: false }
      ]
    }
  ]

  const goals2 = [
    {
      id: 20000,
      title: 'Admin Stuff',
      totalTasksNum: 2,
      completedTasksNum: 1,
      completed: false,
      completionPercent: 50,
      tasks: [
        { id: 0, task: 'Research React', completed: true },
        { id: 1, task: 'Make demo app', completed: false }
      ]
    },
    {
      id: 30000,
      title: 'More Admin stuff',
      totalTasksNum: 5,
      completedTasksNum: 3,
      completed: false,
      completionPercent: 60,
      tasks: [
        { id: 0, task: 'study for CSC309', completed: true },
        { id: 1, task: 'study for CSC384', completed: true },
        { id: 2, task: 'drop MIE424', completed: true },
        { id: 3, task: 'submit AI minor form request', completed: false },
        { id: 4, task: 'submit extra form request', completed: false }
      ]
    }
  ]

  const sessions_user_1 = [
    {
      sessionId: 1,
      userId: 1,
      goalId: 2,
      title: "Work on ocean component",
      startTime: new Date(2021, 2, 1, 8, 0, 0),
      endTime: new Date(2021, 2, 1, 12, 0, 0)
    },
    {
      sessionId: 2,
      userId: 1,
      goalId: 1,
      title: "Learn more about React",
      startTime: new Date(2021, 2, 2, 8, 0, 0),
      endTime: new Date(2021, 2, 2, 12, 0, 0)
    }];

    const sessions_other_users = [
      {
        sessionId: 1,
        userId: 1,
        goalId: 2,
        title: "Work on ocean component",
        startTime: new Date(2021, 2, 1, 8, 0, 0),
        endTime: new Date(2021, 2, 1, 12, 0, 0)
      },
      {
        sessionId: 2,
        userId: 1,
        goalId: 1,
        title: "Learn more about React",
        startTime: new Date(2021, 2, 2, 8, 0, 0),
        endTime: new Date(2021, 2, 2, 12, 0, 0)
      }];

  const usersList = [
    {
      id: 1,
      username: 'user',
      password: 'user',
      adminFlag: false,
      name: 'Pom',
      tagline: '24yyyyy, 🇨🇦',
      goals: goals1,
      friends: [
        { id: 3, name: 'GrassyMans' },
      ],
      sessions: sessions_user_1
    },
    {
      id: 2,
      username: 'admin',
      password: 'admin',
      adminFlag: true,
      name: 'AdminJim',
      tagline: 'your favourite neighborhood admin',
      goals: goals2,
      friends: [
        { id: 4, name: 'Billy' },
      ],
      sessions: sessions_other_users
    },
    {
      id: 3,
      username: 'a',
      password: 'a',
      adminFlag: false,
      name: 'GrassyMans',
      tagline: '',
      goals: goals2,
      friends: [
      ],
      sessions: sessions_other_users
    },
    {
      id: 4,
      username: 'b',
      password: 'b',
      adminFlag: false,
      name: 'PotatoChip',
      tagline: '',
      goals: goals2,
      friends: [
      ],
      sessions: sessions_other_users
    }
  ]

  // React states

  const [users, setUsers] = useState([])
  const [user, setUser] = useState({
    id: null,
    username: '',
    password: '',
    adminFlag: null,
  })

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


  // login function
  const handleLogin = (e) => {
    e.preventDefault()
    console.log('handle login reached')
    const username = document.querySelector('#username-input').children[0].children[1].children[0].value
    const password = document.querySelector('#password-input').children[0].children[1].children[0].value

    console.log(username, password)

    // filter users for user
    const returnedUsers = users.filter(user => user.username === username && user.password === password)
    console.log(returnedUsers)

    if (returnedUsers.length === 1) {
      setUser(returnedUsers[0])
      setLoggedIn(true)
      // TODO: show a login notificataion for the user under the login form
    } else {
      // TODO: Show an error message for the user
      console.log("Incorrect username and password")
    }
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


    if (!usernameExists) {
      const user = {id: 1, username: username, password: password, adminFlag: false, name: name, tagline: "", goals: [], friends: [], sessions: []}
      addUser(user)
      setUser(user)
      setLoggedIn(true)
    }
    else  
      console.log("username already exists")
    //setUser(users[0])
  }

  // logout function
  const handleLogout = (e) => {

    setUser({})
    setLoggedIn(false)
    getUsers(setUsers)
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
            <Ocean user={user} setUser={setUser} users={users} sessions={sessions} setSessions={setSessions} />
          )
        }} />

        <Route path="/profile" render={() => {

          return (
            <Profile mainUser={user} user={usersList[1]} setUser={setUser} />
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
