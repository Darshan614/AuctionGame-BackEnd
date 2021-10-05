const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    credits:{
        type:Number,
        required:true
    },
    basePrice:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Player',playerSchema);