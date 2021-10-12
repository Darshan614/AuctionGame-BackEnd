const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.postsignup = (req,res,next) => {
	const Firstname = req.body.fname;
	const Lastname = req.body.lname;
	const Username = req.body.uname;
	const Email = req.body.mail;
	const Password = req.body.password;

	const user = new User({
		userName:Username,
		email:Email,
		password:bcrypt.hashSync(req.body.password,8),
		firstName:Firstname,
		lastName:Lastname,
		rating:0
	});

	console.log("saving user data");
	user.save((err,user)=>{
		console.log("inside saver");
		if(err){
			console.log("inside errrr",err);
			res.status(500).send({message:err});
			return;
		}
		console.log("Signup success");
		res.send({message:"User was registered successfully!"})
	})
}

exports.login = (req,res,next) => {
	User.findOne({
		username: req.body.username
	})
	.exec((err,user)=>{
		if(err){
			res.status(500).send({message:err});
			return;
		}
		if(!user){
			console.log("not found");
			return res.status(200).send({message:"User not found"});
		}

		var passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if(!passwordIsValid){
			console.log("invalid password");
			return res.status(200).send({
				accessToken:null,
				message:"Invalid Password!"
			})
		}

		var token = jwt.sign({id:user.id},config.secret,{
			expiresIn:86400
		});
		console.log("user craeted");
		res.status(200).send({
			id:user._id,
			username:user.username,
			accessToken:token
		});
	});
}