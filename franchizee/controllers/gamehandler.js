const Game = require('../models/game');
const User = require('../models/user');
const io = require('../socket');

exports.postcreateGame = (req,res,next) => {
	console.log("inside post game");
	const ownerID = req.body.userID;
	console.log(ownerID);
	User.findOne({_id:ownerID})
	.then((user)=>{
		if(!user){
			res.status(200).send({message:"Error:UserID not found"});
			return ;
		}
		console.log("in user");
		let players = [{name:user.userName}];
		const game = new Game({owner:user.userName,players:players});
		game.save()
		.then((result)=>{
			console.log("result of creating ", result);
			io.getIO().sockets.on('connection',socket=>{
				//socket.join(gameID);
				console.log("tryed joining");
				socket.on('room', function(room) {
        			socket.join(room);
    			});
			})
			console.log("players between socket ",players);
			io.getIO().to(result._id).emit('join',{
				action:'Player joined',
				playersList:players
			})
			res.status(201).send({message:"Game created with id:",owner:result.owner,gameID:result._id});

			console.log("result",result.owner);
		})
		.catch((err)=>{
			console.log(err);
		})
	})
}

exports.postjoinGame = (req,res,next) => {
	const gameID = req.body.gameLink;
	const userID = req.body.userID;
	const userName = req.body.username;
	console.log("inside join game with link",gameID);
	Game.findOne({_id:gameID})
	.then((game)=>{
		if(!game){
			res.send({message:"Game Link Invalid"});
			return;
		}
		console.log('game',game,game.players);
		const obj = { name:userName};
		let newplayers = [...(game.players),obj];
		console.log(newplayers);
		game.players = newplayers;
		console.log('players attached');
		game.save()
		.then((data)=>{
			// socket.join(gameID);
			// socket.broadcast.to(gameID).emit('join',{
			// 	action:'Player '
			// })
			io.getIO().sockets.on('connection',socket=>{
				//socket.join(gameID);
				console.log("tryed joining");
				socket.on('room', function(room) {
        			socket.join(room);
    			});
			})
			io.getIO().to(gameID).emit('join',{
				action:'Player joined',
				playersList:newplayers
			})
			res.send({message:"user addition to game done"});
			return;
		})
	})
	console.log("before io");
	
}