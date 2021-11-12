const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
	owner:{
		type:String,
		required:true
	},
	players:[{
		name:{type:String},
		totalpoints:{type:Number},
		moneyleft:{type:Number}
	}],
	cricketers:[{
		name:{type:String},
		basePrice:{type:Number},
		country:{type:String},
		points:{type:Number},
		category:{type:String}
	}]
})

module.exports = mongoose.model('Game',gameSchema);