import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import './goalsdrawer.css'
import './modal.css'

import ProgressBar from './ProgressBar'
import SimpleModal from './Modal'

export default function GoalsDrawer() {

  //drawer state
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const addGoalModalContent = (
    <div className = 'modalContainer'>
      <div className = 'modalContent'>
        <h2 >Add a Goal!</h2>
        <p>
        Content
        </p>
      </div>
    </div>
);


  //drawer contents
  const drawer = (anchor) => (
    <div className='goalsDrawer'>
      <div className='drawerContent'>

        <h1>Your Goals</h1>
        <SimpleModal buttonName ='Add Goal' content = {addGoalModalContent} />

        {/*some harcoded goals */}
        <div className='goalIndividualContainer'>
          <div className = 'goalIndividualContents'>
            <p className = 'bold'> Study for CSC309</p>
            <ProgressBar bgcolor = '#6a1b9a' completed='60'/>
            <Button className = 'button' >See Details</Button>
            <div class="divider"/>
            <Button className = 'button' >Complete</Button>
          </div>

        </div>

        <div className='goalIndividualContainer'>
          <div className = 'goalIndividualContents'>
            <p className = 'bold'> Finish Capstone Project</p>
            <ProgressBar bgcolor = '#6a1b9a' completed='20'/>
            <Button className = 'button' >See Details</Button>
            <div class="divider"/>
            <Button className = 'button' >Complete</Button>
          </div>

        </div>

      </div>

    </div>
  );

  //open side drawer
  return (
    <div className = 'goalsDiv'>
      {['See Your Goals'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button className = 'button' onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={'right'} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {drawer(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

