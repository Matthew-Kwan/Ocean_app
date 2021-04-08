/* server.js, with mongodb API */
'use strict';
require('dotenv').config()

const log = console.log
const logger = require('./logger.js')
const path = require('path')

const usersRouter = require('./routers/user')
const { ObjectID } = require('mongodb')
const express = require('express')
const cors = require('cors')
// starting the express server
const app = express();

/* Session handling */
const MongoStore = require('connect-mongo');
const { reset } = require('nodemon');


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../ocean/build')))

// get the environment state
const env = process.env.NODE_ENV

// start cors if in development
if (env !== 'prod') { app.use(cors({
  credentials: true
})) }

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.

const session = require('express-session')
// Middleware for creating sessions and session cookies.
// A session is created on every request
app.use(session({
  secret: 'tis a secret mate',
  cookie: {
    expires: 3000, // expires in 15 mins
    httpOnly: true,
    secure: false,
  },
  // Session saving options
  saveUnintialized: false, // don't save the initial session if the session object is unmodified (i.e the user did not log in)
  resave: true, // don't resave a session that hasn't been modified
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI_SESSIONS
  })

  }))

  app.use(function (req, res, next) {
    console.log('SESSION LOGGING MIDDLEWARE')
    console.log(req.session);
    next()
  });

app.use((req, res, next) => {
  res.header('Access-control-Allow-Origin', 'http://localhost:3000');
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
  });

// // import the mongoose models
const { User } = require('./models/user')
const { Session } = require('./models/session')
const { Report } = require('./models/report')


// // to validate object IDs
// const { ObjectID } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// request-logger: middleware for logging requests to our API in the terminal
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}
app.use(requestLogger)

/*** Helper functions below **********************************/
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

const authenticate = (req, res, next) => {

  if (req.session.user) {
      User.findById(req.session.user).then((user) => {
          if (!user) {
              return Promise.reject()
          } else {
              req.user = user
              next()
          }
      }).catch((error) => {
          res.status(401).send("Unauthorized")
      })
  } else {
      res.status(401).send("Unauthorized")
  }
}

/*** Webpage routes below **********************************/
/// We only allow specific parts of our public directory to be access, rather than giving
/// access to the entire directory.

// // static js directory
// app.use("/js", express.static(path.join(__dirname, '/public/js')))

// route for root
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/placeholder/index.html'))
})

// TODO: Route to check if a user is logged in on the session
app.get("/api/users/check-session", (req,res) => {
  if (req.session.user) {
    res.send(req.session.user)
  } else {
    res.status(401).send(req.session)
  }
})

app.get("/api/users/check-session2", (req,res) => {

  res.send(req.session)

})

/*** API Routes below */

/*** LOGIN ROUTES */

app.post('/api/users/login', async (req, res) => {

  // pull out the body
  const body = req.body

  // pull out the username and password
  const username = body.username
  const password = body.password

  User.findByUsernamePassword(username, password)
    .then(user => {
      // if we find the user,  the users information to the session to retain all that information
      // will create a function to ensuree that the session exists to make sure that we are logged in
      req.session.user = user
      req.session.username = user.username
      req.session.save()
      console.log(req.session)
      res.send({ user: req.session.user })
    })
    .catch(error => {
      res.status(400).send()
    });
})

// A route to logout a user
app.get("/api/users/logout", (req, res) => {
  // remove the session -> only returns an error
  req.session.destroy(error => {
    if (error) {
      res.status(500).send(error)
    } else {
      console.log('session destroyed')
      res.send()
    }
  })
})

/*** USER ROUTES */
app.post('/api/users', authenticate,  async (req, res) => {

  // check mongoose connection established.
	// if (mongoose.connection.readyState != 1) {
	// 	log('Issue with mongoose connection')
	// 	res.status(500).send('Internal server error')
	// 	return;
	// }

  const body = req.body

  if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

  // Create a new user
	const user = new User({
		id: body.id,
		username: body.username,
		password: body.password,
		adminFlag: body.adminFlag,
		name: body.name,
		tagline: body.tagline,
		goals: body.goals,
		friends: body.friends,
		sessions: body.sessions
	})

  try {
    const result = await user.save()
    res.status(201).send(result)
  } catch (error) {
    console.log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
  }
})

// a GET route to get all users
app.get('/api/users', async (req, res) => {

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// Get the students
	try {
		const users = await User.find()
		// res.send(students) // just the array
		res.status(200).send({ users }) // can wrap students in object if want to add more properties
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

})

// a GET route to get user by id
app.get('/api/users/:id', async (req, res) => {

	const id = req.params.id

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// Get the students
	try {
		const user = await User.findById(id)
		// res.send(students) // just the array
		res.status(200).send({ user }) // can wrap students in object if want to add more properties
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

})

// a PUT route to edit a user by is
app.put('/api/users/:id', async (req, res) => {
	const id = req.params.id
	const body = req.body

	const user = {
		id: body.id,
		username: body.username,
		password: body.password,
		adminFlag: body.adminFlag,
		name: body.name,
		tagline: body.tagline,
		goals: body.goals,
		friends: body.friends,
		sessions: body.sessions
	}

	try {
	  const result = await User.findByIdAndUpdate(id, user, { new:true })

	  res.status(202).send(result)
	} catch (error) {
	  console.log(error)
	  if (isMongoError(error)) {
		res.status(500).send('Internal server error')
	  } else {
		res.status(404).send('Not Found')
	  }
	}
})

// a PUT route to edit a user by is
app.put('/api/users/:id/goal', async (req, res) => {
	const id = req.params.id
	const body = req.body

	const goal = {
		id: body.id,
		title: body.title,
		totalTasksNum: body.totalTasksNum,
		completedTasksNum: body.completedTasksNum,
		completed: body.completed,
		completionPercent: body.completionPercent,
		tasks: body.tasks
	}

	try {
	  const result = await User.findById(id)

	  result.goals.push(goal)

	  const result2 = await User.findByIdAndUpdate(id, result, { new:true })

	  res.status(202).send(result2)
	} catch (error) {
	  console.log(error)
	  if (isMongoError(error)) {
		res.status(500).send('Internal server error')
	  } else {
		res.status(404).send('Not Found')
	  }
	}
})

// a DELETE route to delete a user
app.delete('/api/users/:id', async (req, res) => {
  const id = req.params.id
  try {
    const result = await User.findByIdAndRemove(id)
    try {
      const session_result = await Session.deleteMany({userId: id})
      console.log(session_result)
    } catch (error) {
      console.log("Could not delete users sessions")
    }
    res.status(202).send(result)
  } catch (error) {
    console.log(error)
    if (isMongoError(error)) {
      res.status(500).send('Internal server error')
    } else {
      res.status(404).send('Not Found')
    }
  }

})

/*** END USER ROUTES */

/*** SESSION ROUTES */

// a GET route to get all sessions
app.get('/api/sessions', async (req, res) => {

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// Get the students
	try {
		const sessions = await Session.find()
		// res.send(students) // just the array
		res.status(200).send({ sessions }) // can wrap students in object if want to add more properties
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

})

// a POST route to post a session
app.post('/api/sessions', async (req, res) => {

  // check mongoose connection established.
	// if (mongoose.connection.readyState != 1) {
	// 	log('Issue with mongoose connection')
	// 	res.status(500).send('Internal server error')
	// 	return;
	// }

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  const body = req.body

  if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

  // Create a new session
	const newSession = new Session({
		userId: body.userId,
		goalId: body.goalId,
		title: body.title,
		startTime: body.startTime,
	})

  // // find user with session user
  // const user = await User.findById(ObjectID(req.session.user._id))

  try {
    const result = await newSession.save()
    // user.sessions = user.sessions.concat(ObjectID(result._id))
    // await user.save()
    res.status(201).send(result)
  } catch (error) {
    console.log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
  }
})

// put request for updating a single session
app.put('/api/sessions/:id', async (req, res) => {

  // check mongoose connection established.
	// if (mongoose.connection.readyState != 1) {
	// 	log('Issue with mongoose connection')
	// 	res.status(500).send('Internal server error')
	// 	return;
	// }

  const body = req.body
  const id = req.params.id

  if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

  // Create a new session
	const newSession = {
		userId: body.userId,
		goalId: body.goalId,
		title: body.title,
		startTime: body.startTime,
		endTime: body.endTime,
	}

  try {
    const result = await Session.findByIdAndUpdate(id, newSession, { new:true })
    res.status(202).send(result)
  } catch (error) {
    console.log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
  }
})

// DELETE REQUEST FOR SESSION FOR ADMINS (?)
app.delete('/api/sessions/:id', async (req, res) => {
  const id = req.params.id

  try {
    const result = await Session.findByIdAndRemove(id)
    res.status(202).send(result)
  } catch (error) {
    console.log(error)
    if (isMongoError(error)) {
      res.status(500).send('Internal server error')
    } else {
      res.status(404).send('Not Found')
    }
  }
})





/*** END OF SESSION ROUTES */

/*** REPORT ROUTES */
app.post('/api/reports', async (req, res) => {

	// check mongoose connection established.
	  // if (mongoose.connection.readyState != 1) {
	  // 	log('Issue with mongoose connection')
	  // 	res.status(500).send('Internal server error')
	  // 	return;
	  // }

	const body = req.body

	if (mongoose.connection.readyState != 1) {
		  log('Issue with mongoose connection')
		  res.status(500).send('Internal server error')
		  return;
	  }

	// Create a new report
	const report = new Report({
		title: body.title,
		reportedUser: body.reportedUser,
		reportedBy: body.reportedBy,
		resolved: false,

	})


	//maybe add something to check for duplicate reports/spam by the same user? or is this extra
	try {
	  const result = await report.save()
	  res.status(201).send(result)
	} catch (error) {
	  console.log(error) // log server error to the console, not to the client.
		  if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			  res.status(500).send('Internal server error')
		  } else {
			  res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		  }
	}
  })

//   get all reports
app.get('/api/reports', async (req, res) => {

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// Get the students
	try {
		const reports = await Report.find()
		// res.send(students) // just the array
		res.status(200).send({ reports }) // can wrap students in object if want to add more properties
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

})

// delete report by ID
app.delete('/api/reports/:id', async (req, res) => {
	const id = req.params.id
	try {
	  const result = await Report.findByIdAndRemove(id)
	  res.status(202).send(result)
	} catch (error) {
	  console.log(error)
	  if (isMongoError(error)) {
		res.status(500).send('Internal server error')
	  } else {
		console.log(error)
		res.status(404).send('Not Found')
	  }
	}
  })

// get report by ID

app.get('/api/reports/:id', async (req, res) => {
	const id = req.params.id
	if (!ObjectID.isValid(id)) {
		log('failed isvalid')
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// Get the students
	try {
		const reports = await Report.findById(id)
		// res.send(students) // just the array
		res.status(200).send({ reports }) // can wrap students in object if want to add more properties
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

})
app.put('/api/reports/:id', async (req, res) => {

	// check mongoose connection established.
	  // if (mongoose.connection.readyState != 1) {
	  // 	log('Issue with mongoose connection')
	  // 	res.status(500).send('Internal server error')
	  // 	return;
	  // }

	const body = req.body
	const id = req.params.id

	if (mongoose.connection.readyState != 1) {
		  log('Issue with mongoose connection')
		  res.status(500).send('Internal server error')
		  return;
	  }

	try {
	  const result = await Report.findByIdAndUpdate(id, req.body, { new:true })
	  res.status(202).send(result)
	} catch (error) {
	  console.log(error) // log server error to the console, not to the client.
		  if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			  res.status(500).send('Internal server error')
		  } else {
			  res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		  }
	}
  })
app.patch('/api/reports/:id', async (req,res) => {
	const id = req.params.id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Report not found')
		return;
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}
	log('deleting resveration')
	Report.findById(id).then((report) => {
		if (!report) {
			res.status(404).send('Report not found')  // could not find this student
		} else {

				report.set(req.body)
				report.save().then((result) => {
					res.status(200).send({report})
				}).catch((err0r) => {
					res.status(400).send('Bad Request')
				})
			}
			})
	.catch((error) => {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	})

})

// maybe TODO: get report by submitted user

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../ocean/build/index.html'))
  })

/*** END OF REPORT ROUTES */

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})

