import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import './GoalsDrawer.css'
import './modal.css'

import ProgressBar from './ProgressBar'
import SimpleModal from './Modal'
import { ContactsOutlined } from '@material-ui/icons';


//hardcoded goals for now
const goals = [
  {
    id: 20000,
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
    id: 30000,
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
//end hardcoded goals for now


/*
GoalsDrawer, returns a button that expands a side drawer from the left that contains goal information
*
*
*/
export default function GoalsDrawer() {

  //incrementing unique goalIds
  const [goalId, setGoalId] = React.useState(0);

  //drawer state
  const [state, setState] = React.useState({
    right: false
  });

  //new goal state
  const [newGoal, setNewGoal] = React.useState({
    id: goalId,
    title: '',
    tasks: [],
    totalTasksNum: 0,
    completedTasksNum: 0,
    completionPercent: 0
  });
 
  //toggleDrawer open
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  //refresh drawer on delete
  const refreshDrawerDelete = (anchor, goalId) => (event) => {
    deleteGoal(goalId);
    setState({ ...state, [anchor]: false });
    setState({ ...state, [anchor]: true });
  };

  //refresh drawer on add
  const refreshDrawerAdd = (anchor, goal) => {
    addGoal(goal);
    setState({ ...state, [anchor]: false });
    setState({ ...state, [anchor]: true });
  };

  //handle goal title form entry
  const handleFormGoalEntry = (e) => {
    e.preventDefault()
    const value = e.target.value
    setNewGoal({
      ...newGoal,
      [e.target.name]: value,
      id: goalId
    });
  };

  //handle individual task entry
  const handleFormTaskEntry = (e, taskId) => {
    e.preventDefault()
    const value = e.target.value;

    newGoal.tasks[taskId] = {id: taskId, task: value, completed: false};
    setNewGoal({
      ...newGoal,
      tasks: newGoal.tasks
    })
  };

  //handle task deletion in form
  const handleFormTaskDelete = (taskId) =>  {
    newGoal.tasks.splice(taskId, 1);

    setNewGoal({
      ...newGoal,
      tasks: newGoal.tasks
    })
  }

  //handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    //set total number of tasks
    newGoal.totalTasksNum = newGoal.tasks.length;

    //refreshDrawer and add new goal to drawer
    refreshDrawerAdd('right', newGoal);

    //reset goal and tasks, increase goalId
    setGoalId(goalId+1);

    setNewGoal({
      ...newGoal,
      id: goalId,
      title: '',
      tasks: [],
      totalTasksNum: 0,
      completedTasksNum: 0,
      completionPercent: 0
    });

  };

  //add task
  const addTask = () => {
    setNewGoal({
      ...newGoal,
      tasks: [...newGoal.tasks, '']
    })
  };

  function hasEmptyTaskTitle () {

    
    for (var i=0 ; i < newGoal.tasks.length; i++) {
      if (newGoal.tasks[i].title == '') {
        return true;
      }
    }
    return false;


  }




  //drawer contents, iterate through goal list; current goal list will appear on refresh of drawer
  const drawer = (anchor) => (
    <div className='goalsDrawer'>
      <div className='drawerContent'>

        <div className='drawerTitleDiv'>
          <h1>Your Goals</h1>
        </div>

        <div className='addGoalButtonDiv'>
          <SimpleModal buttonName ='Add Goal' content = {addGoalModalContent(newGoal)} />
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

  //addGoal to Goals
  const addGoalModalContent = (goal) => (
      <div className = 'modalContainer'>
        <div className = 'modalContent'>
          <h2 >Add a Goal!</h2>
          <form className='addGoalForm'>

            
            <TextField className='formTextFieldGoal'
              label="Enter a Goal"
              name="title"
              helperText="Please enter a name for your goal"
              value={goal.title}
              onChange = {handleFormGoalEntry}
              >      

            </TextField>
            <div className ='taskTitleAndButton'>
              <div className='tasksTitleDiv'>
                <h2 >Add Tasks!</h2>
              </div>
    
              <div className='addAnotherTaskButtonDiv'>
                <IconButton color="primary" onClick={addTask} className='taskButton'>
                  <AddIcon />
                </IconButton>
              

              </div>
            </div>
  


            {newGoal.tasks.map((task, index) => (
              <div key = {index}>
                <TextField className='formTextFieldTask'
                  id={index}
                  label="Add a Task"
                  name="task"
                  helperText="Please enter a name for your task"
                  value={task.task}
                  onChange = {(e)=>handleFormTaskEntry(e, index)}
                  >
                </TextField>
                <IconButton color="default" onClick={handleFormTaskDelete} className='rightButton'>
                  <ClearIcon />
                </IconButton>
                
              </div>
            ))}

            <p></p>
            <Button type="submit"
                    variant="outlined"
                    color="primary"
                    onClick={handleFormSubmit}
                    className='formSubmitButton'
                    disabled={!newGoal.title}>
              Create Goal
            </Button>
            <p></p>

          </form>
        </div>
      </div>
  )


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

/*
const for "see details button"
*
*
*/
const seeDetailsModalContent = (goal) => (
  <div className = 'modalContainer'>
    <div className = 'modalContent'>
    <h1>{`${goal.title}`}</h1>
      <h2>Tasks</h2>

      {goal.tasks.map((task) => (
        <div>
          <input type="checkbox" id={task.id} name={task.task} value={task.task} defaultChecked={task.completed}/>
          <label for={task.task}>{`${task.task}`}</label>

        </div>       
      ))}
      <p></p>
      <ProgressBar completed={goal.completionPercent}/>

    </div>
  </div>
)

/*
addGoal to array of goals
*
*
*/
function addGoal(goal) {
  goals.push(goal)
}


/*
deleteGoal from array of goals
*
*
*/
function deleteGoal(goalId) {

  const goal = goals.find(function(goal, index) {
    if(goal.id == goalId)
      return true;
  });
  
  const index = goals.indexOf(goal);
  goals.splice(index, 1);
}
