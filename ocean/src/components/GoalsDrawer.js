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

        <p></p>
        

        <Button type="submit" variant="outlined" color="primary" onClick={addGoal}>
          Add Goal
        </Button>
      </form>
    </div>
  </div>
);




const seeDetailsModalContent = (goal) => (
  <div className = 'modalContainer'>
    <div className = 'modalContent'>
    <h1>{`${goal.title}`}</h1>
      <h2>Tasks</h2>

      {goal.tasks.map((task) => (
        <div>
          <input type="checkbox" id={task.id} name={task.task} value={task.task} checked={task.completed}/>
          <label for={task.task}>{`${task.task}`}</label>

        </div>       
      ))}
      <p></p>
      <ProgressBar completed={goal.completionPercent}/>

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
  
  //toggleDrawer open
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  //refresh drawer on deletee
  const refreshDrawerDelete = (anchor, goalId) => (event) => {
    deleteGoal(goalId);
    setState({ ...state, [anchor]: false });
    setState({ ...state, [anchor]: true });
  };

  //refresh drawer on add
  const refreshDrawerAdd = (anchor, goalId) => (event) => {
    addGoal(goalId);
    setState({ ...state, [anchor]: false });
    setState({ ...state, [anchor]: true });
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
                <SimpleModal buttonName ='See Details' content = {seeDetailsModalContent(goal)}/>
              </div>              
              <Button className = 'rightButton' variant="outlined" color="primary" onClick={refreshDrawerDelete(anchor, goal.id)}>Finished!</Button>
              
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

  const goal = goals.find(function(goal, index) {
    if(goal.id == goalId)
      return true;
  });
  
  const index = goals.indexOf(goal);
  goals.splice(index, 1);
}
