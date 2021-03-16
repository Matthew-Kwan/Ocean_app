/* This module will hold our connection to
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
const mongoose = require('mongoose')
require('../.env')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
console.log(process.env.MONGODB_URI)
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then((data) => {
    console.log('Successfully connected to mongodb!')
  })
	.catch((error) => {
		console.log('Error connecting to mongodb. Timeout reached.')
	})
;

module.exports = { mongoose }  // Export the active connection.