/* Student mongoose model */
const mongoose = require('mongoose')

const Session = mongoose.model('Session', {
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	goalId: {type: Number},
  title: {type: String},
  startTime: {type: Date},
  endTime: {type: Date},
})

module.exports = { Session }