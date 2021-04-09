/* User mongoose model */
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


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


// USER SCHEMA

const userSchema = new mongoose.Schema({
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
  profilePic: {
    type: String
  },
  goals: [goalSchema],
  friends: [friendSchema],
  sessions: [sessionSchema],
})

// Mongoose middleware for user schema
// This function runs prior to saving the document to the collection
userSchema.pre('save', function(next) {
  const user = this // bind this to user document instance

  // make sure we don't hash the password more than once
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err,hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

// static method for logging in
// compares the username and password of what is entered and tries to find it in the User collection
userSchema.statics.findByUsernamePassword = function (username, password) {
  const User = this

  return User.findOne({ username: username }).then((user) => {

    // if can not find the user, reject
    if (!user) {
      return Promise.reject()
    }
    // if the user exists, now check the password
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user)
        } else {
          reject()
        }
      })
    })
  })
}


const User = mongoose.model('User', userSchema)

const Goal = mongoose.model('Goal', goalSchema)

module.exports = { User, Goal }