const mongoose = require('mongoose')

const Report = mongoose.model('Report', {
	title: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
    },
    reportedUser: {
        type:String,
        required: true,
        // right now, assume reported user and reportedBy are both user IDs. maybe they should be objects?

    },
	reportedBy: {
		type: String,
		required: true,
		// default: 1
    },
    
    resolved:{
        type: Boolean,
        required:true,
        default:false
    }
})

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
      },
      username: {
        type: String,
        required: true,
        minlength: 3,
      },
      name: {
		type: String,
		required: true,
    },
    tagline: {
        type: String
      }
})

module.exports = { Report }