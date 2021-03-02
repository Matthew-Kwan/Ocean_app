import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import './GoalsDrawer.css'

export default function GoalsDrawer() {

  //drawer state
  const [state, setState] = React.useState({
    right: false,
  });

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  //drawer contents
  const drawer = (anchor) => (
    <div className='goalsDrawer'>
      <div className='drawerContent'>

        <h1>Your Goals</h1>
        
        <Button className = 'button' onClick={handleOpen}>Add Goal</Button>

        <div className='goalIndividualContainer'>
          <div className = 'goalIndividualContents'>
            <p className = 'bold'> Study for CSC309</p>
            <Button className = 'button' >See Details</Button>
            <div class="divider"/>
            <Button className = 'button' >Complete</Button>
          </div>

        </div>
        <div className='goalIndividualContainer'>
          <div className = 'goalIndividualContents'>
            <p className = 'bold'> Study for CSC309</p>
            <Button className = 'button' >See Details</Button>
            <div class="divider"/>
            <Button className = 'button' >Complete</Button>
          </div>

        </div>

      </div>

    </div>
  );


  //new goal modal
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
  </Modal>






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

