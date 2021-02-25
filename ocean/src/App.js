import './App.css';
import React, { useState, useEffect } from 'react'

// import components
import Ocean from './components/Ocean'
import Tank from './components/Tank'

// import React Router
import { Route, Switch, Link, BrowserRouter } from 'react-router-dom'

function App() {

  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if(user) {
      setLoggedIn(true)
    }
  },[user])

  return (

    <BrowserRouter>
      <div>
        <Link className="link" to="/">home</Link>
        <Link className="link" to="/ocean">ocean</Link>
        <Link className="link" to="/tank">tank</Link>
      </div>

      <Switch>
        <Route path="/ocean" render={() => {
          // will need this to redirect to login page if the user is not logged in
          return (
            <Ocean user={user} setUser={setUser}/>
          )
        }}/>


        <Route path="/tank" render={() => {
          return (
            <Tank/>
          )
        }}/>

        <Route path="/" render={() => {
          return (
            <h1>Home</h1>
          )
        }}/>


      </Switch>

    </BrowserRouter>
  );
}

export default App;
