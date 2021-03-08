import './App.css';
import React, { useState, useEffect } from 'react'

// import components
import Ocean from './components/Ocean'
import Tank from './components/Tank'
import Profile from './components/Profile'
import YourProfile from './components/YourProfile'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'


// import materialUI components
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import './components/modal.css'
import './components/profile.css'
import ProgressBar from './components/ProgressBar'
import ButtonModal from './components/ButtonModal'

// import React Router
import { Route, Switch, Link, Redirect, BrowserRouter } from 'react-router-dom'

// hardcoded data


// helper functions

function handleModalOpen(state) {
  state = true;
};

function handleModalClose(state) {
  state = false;
};


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

const LoginModule = ({loggedIn,handleLogin,classes}) => {
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
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleLogin}>
                        <div className = 'input' id="username-input">
                        <TextField required id="outlined-basic" size='small' label="Username" variant="outlined" /></div>
                        <div className= 'input' id="password-input">
                        <TextField required name="" id="outlined-basic" size='small' label="Password" type="password" variant="outlined" /></div>
                        <Button type='submit' variant="contained" color="primary">
                            Login
                        </Button>
                    </form>

                </CardContent>

                </Card>
            <img className="illustration"></img>
      </div> )

  }
}
const NavBar = ({loggedIn, handleLogout, user, setUser}) => {
  if (loggedIn) {
    return (
      <div>
        {/* <Link className="link" to="/">home</Link> */}
        <Link className="link" to="/ocean">ocean</Link>
        <Link className="link" to="/tank">tank</Link>
        <Link className="link" to="/profile">profile</Link>
        <ButtonModal buttonName ='Ur Profile' content = {YourProfile({user,setUser})} />
        <Link className="link" to="/admin">admin dashboard</Link>
        { loggedIn ? <Link to="/" onClick={handleLogout}> logout </Link> : null }
    </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

function App() {
  const goals1 = [
    {
      id: 30000,
      title: 'Software',
      totalTasksNum: 2,
      completedTasksNum: 1,
      completed: false,
      completionPercent: 50,
      tasks: [
        {id: 0, task: 'Research React', completed: true},
        {id: 1, task: 'Make demo app', completed: false}
      ]
    },
    {
      id: 2,
      title: 'School',
      totalTasksNum: 5,
      completedTasksNum: 3,
      completed: false,
      completionPercent: 60,
      tasks: [
        {id: 0, task: 'study for CSC309', completed: true},
        {id: 1, task: 'study for CSC384', completed: true},
        {id: 2, task: 'drop MIE424', completed: true},
        {id: 3, task: 'submit AI minor form request', completed: false},
        {id: 4, task: 'submit extra form request', completed: false}
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
        {id: 0, task: 'Research React', completed: true},
        {id: 1, task: 'Make demo app', completed: false}
      ]
    },
    {
      id: 2,
      title: 'More Admin stuff',
      totalTasksNum: 5,
      completedTasksNum: 3,
      completed: false,
      completionPercent: 60,
      tasks: [
        {id: 0, task: 'study for CSC309', completed: true},
        {id: 1, task: 'study for CSC384', completed: true},
        {id: 2, task: 'drop MIE424', completed: true},
        {id: 3, task: 'submit AI minor form request', completed: false},
        {id: 4, task: 'submit extra form request', completed: false}
      ]
    }
  ]

  const sessions_user_1 = [
    {
      sessionId: 1,
      userId: 1,
      goalId: 2,
      title: "Work on ocean component",
      startTime: new Date(2021,2,1,8,0,0),
      endTime: new Date(2021,2,1,12,0,0)
    },
    {
      sessionId: 2,
      userId: 1,
      goalId: 1,
      title: "Learn more about React",
      startTime: new Date(2021,2,2,8,0,0),
      endTime: new Date(2021,2,2,12,0,0)
  }];

  const usersList = [
    {
      id: 1,
      username: 'test',
      password: 'test',
      adminFlag: false,
      name: 'Pom',
      tagline: '24yyyyy, 🇨🇦',
      goals: goals1,
      friends: [
        {id:3, name: 'GrassyMans'},
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
        {id:4, name: 'Billy'},
      ]
    },
    {
      id: 3,
      username: 'a',
      password: 'a',
      adminFlag: true,
      name: 'GrassyMans',
      tagline: '',
      goals: goals2,
      friends: [
      ]
    },
    {
      id: 4,
      username: 'b',
      password: 'b',
      adminFlag: true,
      name: 'PotatoChip',
      tagline: '',
      goals: goals2,
      friends: [
      ]
    }
  ]

  const sessionsList = [
    {
      sessionId: 1,
      userId: 1,
      goalId: 2,
      title: "Work on ocean component",
      startTime: new Date(2021,2,1,8,0,0),
      endTime: new Date(2021,2,1,12,0,0),
    },
    {
      sessionId: 2,
      userId: 1,
      goalId: 1,
      title: "Learn more about React",
      startTime: new Date(2021,2,2,8,0,0),
      endTime: new Date(2021,2,2,12,0,0),
    },
    {
      sessionId: 3,
      userId: 3,
      goalId: 2,
      title: "Report some peeps",
      startTime: new Date(2021,2,3,8,0,0),
      endTime: null,
    },
  ]

  // React states

  const [users, setUsers] = useState(usersList)
  const [user, setUser] = useState({
    id: null,
    username: '',
    password: '',
    adminFlag: null,
  })

  const [tempUser, setTempUser] = useState({
    username: '',
    password: '',
  })

  const [sessions, setSessions] = useState(sessionsList)

  const [loggedIn, setLoggedIn] = useState(false)

  const classes = useStyles();

  // useEffect(() => {
  //   if(user) {
  //     setLoggedIn(true)
  //   }
  // },[user])


  // login function
  const handleLogin = (e) => {
    e.preventDefault()
    console.log('handle login reached')
    const username = document.querySelector('#username-input').children[0].children[1].children[0].value
    const password = document.querySelector('#password-input').children[0].children[1].children[0].value

    console.log(username, password)
    // filter users for user
    const returnedUsers = users.filter(user => user.username === username && user.password === password)

    if (returnedUsers.length === 1) {
      setUser(returnedUsers[0])
      setLoggedIn(true)
      window.alert("Successfully logged in")
    } else {
      // TODO: Show an error message for the user
      console.log("Incorrect username and password")
      window.alert("Incorrect username and password")
    }
  }

  // logout function
  const handleLogout = (e) => {

    setUser({})
    setLoggedIn(false)
  }

  return (

    <BrowserRouter>
      <div>
        <NavBar loggedIn={loggedIn} handleLogout={handleLogout} user = {user} setUser = {setUser}/>
        {/* <Link className="link" to="/">home</Link>
        <Link className="link" to="/ocean">ocean</Link>
        <Link className="link" to="/tank">tank</Link>
        <Link className="link" to="/profile">profile</Link>
        <Link className="link" to="/yourprofile">ur profile</Link>
        { loggedIn ? <Link to="/" onClick={handleLogout}> Log Out </Link> : null } */}
      </div>

      <Switch>
        <Route path="/ocean" render={() => {
          // will need this to redirect to login page if the user is not logged in
          return (
            <Ocean user={user} sessions={sessions}/>
          )
        }}/>

        <Route path="/profile" render={() => {

          return(
            <Profile mainUser={user} user={usersList[1]} setUser = {setUser}/>
          )
        }}/>

        <Route path="/admin" render={() => {

        return(
          <AdminDashboard users = {usersList}/>
        )
        }}/>

        <Route path="/yourprofile" render={() => {

        return(
          <YourProfile user={user} setUser = {setUser}/>
        )
        }}/>

        <Route path="/tank" render={() => {
          return (
            <Tank user = {user}/>
          )
        }}/>

        <Route path="/">
          {loggedIn ? <Redirect to="/ocean"/> : null}
        </Route>


      </Switch>

      <LoginModule loggedIn={loggedIn} handleLogin={handleLogin} classes = {classes}></LoginModule>

    </BrowserRouter>
  );
}

export default App;
