/* User mongoose model */
const mongoose = require('mongoose')

/*
    {
      id: 1,
      username: 'user',
      password: 'user',
      adminFlag: false,
      name: 'Pom',
      tagline: '24yyyyy, 🇨🇦',
      goals: goals1,
      friends: [
        { id: 3, name: 'GrassyMans' },
      ],
      sessions: sessions_user_1
    },

      const goals1 = [
    {
      id: 30000,
      title: 'Software',
      totalTasksNum: 2,
      completedTasksNum: 1,
      completed: false,
      completionPercent: 50,
      tasks: [
        { id: 0, task: 'Research React', completed: true },
        { id: 1, task: 'Make demo app', completed: false }
      ]
    }
*/

const taskSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  task: {
    type: String
  },
  completed: {
    type: Boolean
  },
})

const goalSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  title: {
    type: String
  },
  totalTasksNum: {
    type: Number
  },
  completedTasksNum: {
    type: Number
  },
  completed: {
    type: Boolean
  },
  completionPercent: {
    type: Number
  },
  tasks: [taskSchema]
})

const friendSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String
  }
})

const sessionSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  }
})

// UNIQUENESS VALIDATION
const User = mongoose.model('User', {

  id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
  },
  adminFlag: {
    type: Boolean,
    required: true,
  },
	name: {
		type: String,
		required: true,
	},
  tagline: {
    type: String
  },
  goals: [goalSchema],
  friends: [friendSchema],
  sessions: [sessionSchema]
})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = { User, Goal }