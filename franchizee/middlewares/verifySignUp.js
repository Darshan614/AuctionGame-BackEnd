const User = require('../models/user');

checkDuplicateUsernameOrEmail = (req,res,next) => {
	User.findOne({
		userName:req.body.uname
	}).exec((err,user)=>{
		if(err){
			res.status(500).send({message:err});
			return;
		}
		if(user){
			res.status(200).send({message:"Username already exists!"});
			return;
		}
		User.findOne({
			email:req.body.mail
		}).exec((err,user)=>{
			if(err){
				res.status(500).send({message:err});
				return;
			}
			if(user){
				res.status(200).send({message:"Email already exists!"});
				return;
			}
			next();
		})
	})
}

const verifySignUp = {
	checkDuplicateUsernameOrEmail
}

module.exports = verifySignUp;