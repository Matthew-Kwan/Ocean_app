const User = require('../models/user')

const usersRouter = require('express').Router()

// POST Request
usersRouter.post('/api/users', async (req, res) => {

  // check mongoose connection established.
	// if (mongoose.connection.readyState != 1) {
	// 	log('Issue with mongoose connection')
	// 	res.status(500).send('Internal server error')
	// 	return;
	// }

  const body = req.body

  // Create a new user
	const user = new User({
		id: body.id,
		username: body.username,
    password: body.password,
    adminFlag: body.adminFlag,
    name: body.name,
    tagline: body.tagline,
    goals: body.goals,
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

module.exports = usersRouter