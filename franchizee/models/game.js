const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
	owner:{
		type:String,
		required:true
	},
	players:[{
		name:{type:String}
	}]
})

module.exports = mongoose.model('Game',gameSchema);