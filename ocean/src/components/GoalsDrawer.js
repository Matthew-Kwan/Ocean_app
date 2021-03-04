import React from 'react';
import { useRef, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import './GoalsDrawer.css'
import './modal.css'

import ProgressBar from './ProgressBar'
import ButtonModal from './ButtonModal'
import { ContactsOutlined } from '@material-ui/icons';

/*
GoalsDrawer, returns a button that expands a side drawer from the left that contains goal information
*
*
*/
export default function GoalsDrawer(props) {

  //user goal list
  const { goals } = props;

  //*STATES

  //modal states
  const [openGoalModal, setOpenGoalModal] = React.useState(false);  //goal modal
  const [openDetailsModal, setOpenDetailsModal] = React.useState(false); //details modal
  const [openEditModal, setOpenEditModal] = React.useState(false); //edit modal

  const [detailsModalContent, setDetailsModalContent] = React.useState({
    content: null
  })

  const [editModalContent, setEditModalContent] = React.useState({
    content: null
  })


  //drawer state
  const [state, setState] = React.useState({ 
    right: false
  });


  //goal states
  const [goalId, setGoalId] = React.useState(0); //incrementing unique goalIds

  const [newGoal, setNewGoal] = React.useState({  //new goal state
    id: goalId,
    title: '',
    tasks: [],
    totalTasksNum: 0,
    completedTasksNum: 0,
    completionPercent: 0
  });


  //*HANDLERS

  //drawer handlers
  const toggleDrawer = (anchor, open) => (event) => { //toggleDrawer open
    setState({ ...state, [anchor]: open });
  };

  const refreshDrawerDelete = (anchor, goalId) => (event) => { //refresh drawer on delete
    deleteGoal(goalId);
    setState({ ...state, [anchor]: false });
    setState({ ...state, [anchor]: true });
  };

  const refreshDrawerAdd = (anchor, goal) => { //refresh drawer on add
    addGoal(goal);
    setState({ ...state, [anchor]: false });
    setState({ ...state, [anchor]: true });
  };


  //goal form handlers
  const handleFormGoalEntry = (e) => { //handle goal title form entry
    e.preventDefault()
    const value = e.target.value
    setNewGoal({
      ...newGoal,
      [e.target.name]: value,
      id: goalId
    });
  };

  const handleFormTaskEntry = (e, taskId) => { //handle individual task entry
    e.preventDefault()
    const value = e.target.value;

    newGoal.tasks[taskId] = {id: taskId, task: value, completed: false};
    setNewGoal({
      ...newGoal,
      tasks: newGoal.tasks
    })
  };

  const handleFormTaskDelete = (taskId) =>  { //handle task deletion in form
    newGoal.tasks.splice(taskId, 1);

    setNewGoal({
      ...newGoal,
      tasks: newGoal.tasks
    })
  }

  const handleFormSubmit = (e) => { //handle form submit
    e.preventDefault();

    newGoal.totalTasksNum = newGoal.tasks.length; //set total number of tasks

    refreshDrawerAdd('right', newGoal); //refreshDrawer and add new goal to drawer

    setGoalId(goalId+1); //reset goal and tasks, increase goalId

    setNewGoal({
      ...newGoal,
      id: goalId,
      title: '',
      tasks: [],
      totalTasksNum: 0,
      completedTasksNum: 0,
      completionPercent: 0
    });

    handleGoalModalClose();

  };

  //modal handlers
  const handleGoalModalOpen = () => { //open goal modal
    setOpenGoalModal(true);
  };

  const handleGoalModalClose = () => { //close goal modal
    setOpenGoalModal(false);
  };

  const handleDetailsModalOpen = (goal) => { //open correct details modal
    setDetailsModalContent({content:seeDetailsModalContent(goal)});
    setOpenDetailsModal(true);
  };

  const handleDetailsModalClose = () => { //close details modal
    setOpenDetailsModal(false);
  };

  const handleEditModalOpen = (goal) => {
    console.log(goal)
    setEditModalContent({content:editGoalModalContent(goal)});
    setOpenEditModal(true);
  }

  const handleEditModalClose = () => {
    setOpenEditModal(false);
  }




  //add task
  const addTask = () => {
    setNewGoal({
      ...newGoal,
      tasks: [...newGoal.tasks, '']
    })
  };

  //check for empty tasks
  function hasEmptyTaskTitle () {

    
    for (var i=0 ; i < newGoal.tasks.length; i++) {
      if (newGoal.tasks[i].title == '') {
        return true;
      }
    }
    return false;


  }


  /*
  /drawer contents, iterate through goal list; current goal list will appear on refresh of drawer
  *
  *
  */
  const drawer = (anchor) => (
    <div className='goalsDrawer' >
      <div className='drawerContent'>

        <div className='drawerTitleDiv' >
          <h1>Your Goals</h1>
        </div>

        <div className='addGoalButtonDiv' >
          <Button onClick={handleGoalModalOpen} variant="outlined" color="primary">Add Goal</Button>
          <Modal open={openGoalModal} onClose={handleGoalModalClose} >
            {addGoalModalContent(newGoal)}
          </Modal>
        </div>

        <div className='goalsList' >

        {goals.map((goal) => (

          <div className='goalIndividualContainer'>
            <div className = 'goalIndividualContents'>
              <div className = 'goalTitleDiv'>
                <p className = 'bold' > {`${goal.title}`}</p>
              </div>
              <div className = 'rightButton'>
                <IconButton color="primary" onClick={() => handleEditModalOpen(goal)} >
                  <EditOutlinedIcon />
                </IconButton>

              </div>
              
              <ProgressBar completed={goal.completionPercent} />

              <div className = 'leftButton'>     
                <Button onClick={() => handleDetailsModalOpen(goal)} variant="outlined" color="primary">See Details</Button>
              </div>              
              <Button className = 'rightButton' variant="outlined" color="primary" onClick={refreshDrawerDelete(anchor, goal.id) }>Finished!</Button>
                    
            </div>

          </div>
        ))}
        <Modal open={openDetailsModal} onClose={handleDetailsModalClose} >
          {detailsModalContent.content}
        </Modal>

        <Modal open={openEditModal} onClose={handleEditModalClose} >
          {editModalContent.content}
        </Modal>

        </div>
      </div>
    </div>
  );


  /*
  /addGoal to Goals
  *
  *
  */
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
                <IconButton color="primary" onClick={addTask}>
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


  /*
  const for "see details button"
  *
  *
  */
  const seeDetailsModalContent = (goal) => (
    <div className = 'modalContainer'>
      <div className = 'modalContent'>
        <div className = 'seeDetailsGoalTitle'>
          <h1>{`${goal.title}`}</h1>
        </div>
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


  const editGoalModalContent = (goal) => (
    <div className = 'modalContainer'>
      <div className = 'modalContent'>
        <h2 >Goal Title: </h2>

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
              <h2 >Current Tasks: </h2>
            </div>
  
            <div className='addAnotherTaskButtonDiv'>
              <IconButton color="primary" onClick={addTask}>
                <AddIcon />
              </IconButton>
            </div>
          </div>

          {goal.tasks.map((task, index) => (
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
                  disabled={!goal.title}>
            Edit Goal
          </Button>
          <p></p>

        </form>
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


  /*
  /return button and sideDrawer
  *
  *
  */
  return (
    <div className = 'goalsButtonDiv'>
      {['See Your Goals'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} variant="outlined" color="primary">{anchor}</Button>
          <Drawer anchor={'right'} open={state[anchor]} onClose={toggleDrawer(anchor, false)} >
            {drawer(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}