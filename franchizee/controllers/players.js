const Player = require('../models/player');

exports.getBatsman = (req,res,next) => {
    
    Player.find()
    .then(data=>{
        if(!data){
            console.log('KOI DATA NHI MILA')
        }
        res.status(200).json({
            batsman:data
        })
        
        console.log('data from DB',data)
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.postInviteFriends = (req,res,next) => {
    const name = req.body.name;
    res.status(201).json({
        friendFound:true,
        Friend:{name:name}
    })
}

exports.postInvitation = (req,res,next) => {
    res.status(201).json({
        requestAccepted:true
    })
}