import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './GoalsDrawer.css'
import './modal.css'

import ProgressBar from './ProgressBar'
import SimpleModal from './Modal'


//hardcoded goals for now
const goals = [
  {
    id: 1,
    title: 'Software',
    totalTasksNum: 2,
    completedTasksNum: 1,
    completionPercent: 50,
    tasks: [
      {id: 1, task: 'Research React', completed: true},
      {id: 2, task: 'Make demo app', completed: false}
    ]
  }, 
  {
    id: 2,
    title: 'School',
    totalTasksNum: 5,
    completedTasksNum: 3,
    completionPercent: 60,
    tasks: [
      {id: 1, task: 'study for CSC309', completed: true},
      {id: 2, task: 'study for CSC384', completed: true},
      {id: 3, task: 'drop MIE424', completed: true},
      {id: 4, task: 'submit AI minor form request', completed: false},
      {id: 5, task: 'submit extra form request', completed: false}
    ]
  }
]

//hardcoded goals for now

const addGoalModalContent = (
  <div className = 'modalContainer'>
    <div className = 'modalContent'>
      <h2 >Add a Goal!</h2>
      <form className='addGoalForm'>

        
        <TextField className='formTextField'
          label="Enter a Goal"
          name="Enter a Goal"
          helperText="Please enter a name for your goal"
          >      

        </TextField>

        <TextField className='formTextField'
          label="Add a Task"
          name="Add a Task"
          helperText="Please enter a name for your task"
          >
        </TextField>

        <Button type="submit" variant="outlined" color="primary" onClick={addGoal}>
          Start Session
        </Button>
      </form>
    </div>
  </div>
);

/*

const seeDetailsModalContent = goal => (
  <div className = 'modalContainer'>
    <div className = 'modalContent'>
    <h1>{`${goal.title}`}</h1>
      <h2>Tasks</h2>

      {goal.tasks.map((task) => (
        <div>
          <li>{`${task.task}`}</li>
        </div>       
      ))}
      <p></p>
      <ProgressBar completed={goal.completionPercent}/>

    </div>
  </div>
)
*/

const seeDetailsModalContent =  (
  <div className = 'modalContainer'>
    <div className = 'modalContent'>
    <h1>{`${goals[0].title}`}</h1>
      <h2>Tasks</h2>

      {goals.map((goal, index) => (
        <div key={index}>

        {goal.tasks.map((task) => (

          <li>{`${task.task}`}</li>

        ))}
        <ProgressBar completed={goal.completionPercent}/>
        </div>
        
      ))}

    </div>
  </div>
)


function createGoalDetailsContent() {

}

/*
GoalsDrawer, returns a button that expands a side drawer from the left that contains goal information

*/
export default function GoalsDrawer() {

  //drawer state
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };


  //drawer contents, iterate through goal list; current goal list will appear on refresh of drawer
  const drawer = (anchor) => (
    <div className='goalsDrawer'>
      <div className='drawerContent'>

        <div className='drawerTitleDiv'>
          <h1>Your Goals</h1>
        </div>

        <div className='addGoalButtonDiv'>
          <SimpleModal buttonName ='Add Goal' content = {addGoalModalContent} />
        </div>

        <div className='goalsList'>

        {goals.map((goal) => (

          <div className='goalIndividualContainer'>
            <div className = 'goalIndividualContents'>
              <p className = 'bold'> {`${goal.title}`}</p>
              
              <ProgressBar completed={goal.completionPercent}/>

              <div className = 'leftButton'>
                <SimpleModal buttonName ='See Details' content = {seeDetailsModalContent}/>
              </div>              
              <Button className = 'rightButton' variant="outlined" color="primary" onClick={deleteGoal}>Finished!</Button>
            </div>

          </div>
        ))}

        </div>
      </div>
    </div>
  );

  //return button and sideDrawer
  return (
    <div className = 'goalsButtonDiv'>
      {['See Your Goals'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} variant="outlined" color="primary">{anchor}</Button>
          <Drawer anchor={'right'} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {drawer(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

function addGoal(goal) {
  goals.push(
    {
      id: 3,
      title: 'Mela',
      totalTasksNum: 10,
      completedTasksNum: 7,
      completionPercent: 70,
      tasks: {
  
      }
    })
}

function deleteGoal(goalId) {
  goals.splice(goalId, 1);

}
