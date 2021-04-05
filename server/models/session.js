/* Student mongoose model */
const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	goalId: {type: String},
  title: {type: String},
  startTime: {type: Date},
  endTime: {type: Date},
})

sessionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Session = mongoose.model('Session', sessionSchema)

module.exports = { Session }