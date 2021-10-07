const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.postsignup = (req,res,next) => {
	const Firstname = req.body.fname;
	const Lastname = req.body.lname;
	const Username = req.body.uname;
	const Email = req.body.mail;
	const Password = req.body.password;
	User.findOne({email:Email})
	.then(user=>{
		if(user)
		{
			return res.status(200).json({
				message:"Already Present"
			})
		}
		else if(!user)
		{
			User.findOne({userName:Username})
			.then(user=>{
				if(user)
				{
					return res.status(200).json({
						message:"Already Present"
					})
				}
				else if(!user)
				{
					bcrypt.hash(Password,10)
					.then(hashedPassword=>{
						const user = new User({
							userName:Username,
							firstName:Firstname,
							lastName:Lastname,
							email:Email,
							password:hashedPassword,
							rating:0
						});
						console.log(user);
						user.save()
						.then(result => {
							console.log("result",result);
							res.status(200).json({
								message:"SignUp Successfull"
							})
						})
						.catch(err=>{
							console.log(err);
						})
					})
					.catch(err=>{
						console.log(err);
					})
				}
			})
		}
	})
}