import './App.css';
import React from 'react'

// import components
import Ocean from './components/Ocean'
import Tank from './components/Tank'

// import React Router
import { Route, Switch, Link, BrowserRouter } from 'react-router-dom'

function App() {
  return (

    <BrowserRouter>
      <div>
        <Link to="/">home</Link>
        <Link to="/ocean">ocean</Link>
        <Link to="/tank">tank</Link>
      </div>

      <Switch>
        <Route path="/ocean" render={() => {
          return (
            <Ocean/>
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
