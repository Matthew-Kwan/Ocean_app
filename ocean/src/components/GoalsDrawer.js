import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

  let goalId = 0
  let numTasksPerGoal = 0;

  //drawer state
  const [state, setState] = React.useState({
    right: false
  });

  const [addTask, setAddTask] = React.useState(false);

  //new goal state
  const [newGoal, setNewGoal] = React.useState({
    id: goalId,
    title: '',
    tasks: [],
    totalTasksNum: 0,
    completedTasksNum: 0,
    completionPercent: 0
  });
  
  //new task state
  const [newTask, setNewTask] = React.useState({
    id: numTasksPerGoal,
    task: '',
    completed: false
  })
  
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
  const refreshDrawerAdd = (anchor, goal) => {
    addGoal(goal);
    setState({ ...state, [anchor]: false });
    setState({ ...state, [anchor]: true });
  };

  //reset Goal for next goal
  const resetGoal = () => {
    setNewGoal({
      ...newGoal,
      id: goalId,
      title: '',
      tasks: [],
      totalTasksNum: 0,
      completedTasksNum: 0,
      completionPercent: 0
    });
  }

  //reset tasks for next goal 
  const resetTask = () => {
    setNewTask({
      ...newTask,
      id: 0,
      task: '',
      completed: false
    });
  }

  //handle goal title form entry
  const handleFormGoalEntry = (e) => {
    e.preventDefault()
    const value = e.target.value
    setNewGoal({
      ...newGoal,
      [e.target.name]: value
    });
  };

  //handle individual task entry
  const handleFormTaskEntry = (e) => {
    e.preventDefault()
    const value = e.target.value
    setNewTask({
      ...newTask,
      [e.target.name]: value,
      id: numTasksPerGoal
    });
  };

  //handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // taskList.forEach(function(task) {
    //   newGoal.tasks.push(task)
    // });

    //add task to goal tasklist
    newGoal.tasks.push(newTask)
    newGoal.totalTasksNum++;

    //refreshDrawer and add new goal to drawer
    refreshDrawerAdd('right', newGoal);

    //reset goal and tasks, increase goalId
    goalId++;
    numTasksPerGoal = 0;
    resetGoal();
    resetTask();
  };

  const addAnotherTask = () => {

    setAddTask(true);
    numTasksPerGoal++;
    console.log(numTasksPerGoal)
  };




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

  //for regenerating tasks
  const Task = (task) => { 
    return (
      <div>
          <TextField className='formTextFieldTask'
            id={numTasksPerGoal}
            label="Add a Task"
            name="task"
            helperText="Please enter a name for your task"
            value={task.task}
            onChange = {handleFormTaskEntry}
            >
          </TextField>
        
      </div>
  )}

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
            
            <div className='tasksTitleDiv'>
              <h2 >Add Tasks!</h2>
            </div>
  
            <div className='addAnotherTaskButtonDiv'>
              <Button variant="outlined" color="primary" classNsame='taskButton' onClick={addAnotherTask}>Add Another Task</Button>
            </div>
  
            {Task(newTask)}

            {
              addTask ? <div>{Task(newTask)}</div> : <div></div>
            }
            
            <Button type="submit" variant="outlined" color="primary" onClick={handleFormSubmit} className='rightButton'>
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

  console.log(goals)
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
