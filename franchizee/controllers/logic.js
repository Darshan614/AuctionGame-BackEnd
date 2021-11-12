const io = require('../socket');
const Game = require('../models/game');
const User = require('../models/user');

exports.getrules = (req,res,next) => {
	const gameId = req.body.gameId;
	io.getIO().to(gameId).emit('rules',{
		action:'show rules'
	})
	res.status(200).send({message:"Fetched rules"})
}

exports.postbid = (req,res,next) => {
	const gameId = req.body.gameLink;
	const username = req.body.username;
	const currentbid = req.body.currentbid;
	const nextbid = req.body.nextbid;
	console.log(gameId,username,currentbid,nextbid);
	io.getIO().sockets.on('connection',socket=>{
		//socket.join(gameID);
		console.log("tryed joining");
		socket.on('room', function(room) {
        	socket.join(room);
    	});
	})
	const biddetails = {
		username:username,
		currentbid:nextbid,
		nextbid:nextbid+10
	}
	io.getIO().to(gameId).emit('bid',{
		action:'bid placed',
		biddetails:biddetails
	})
	res.status(200).send({message:"Bid placed"});
}
let a=1;
exports.postfinalbid = (req,res,next) => {
	console.log("New player demand afer",req.body.ownername);
	const gameId = req.body.gameId;
	Game.findOne({_id:req.body.gameId})
	.then((game)=>{
		console.log('fb',game);
		if(req.body.ownername!="N-a-n")
		{
			console.log(game.players)
			let ownerindex = game.players.findIndex(player=>player.name==req.body.ownername);
			console.log('oi',ownerindex);
			game.players[ownerindex].totalpoints=game.players[ownerindex].totalpoints+req.body.points;
			game.players[ownerindex].moneyleft-=req.body.finalbid*10000;
		}
		if(game.cricketers.length==0)
		{
			const winner = game.players.reduce((prev,curr)=>{
				console.log('previous player',prev);
				return (prev.totalpoints<curr.totalpoints?curr:prev);
			})
			console.log("winner decided",winner)
			res.status(200).send({message:"Match Finished",winner:winner});
			return ;
		}
		let cricketer = game.cricketers[game.cricketers.length-1];
		
		
		game.cricketers.pop();
		game.save()
		.then((data)=>{
			io.getIO().to(gameId).emit('change',{
				action:'bid placed',
				newplayer:{message:"Player done",
				playername:cricketer.name,
				basePrice:cricketer.basePrice,
				country:cricketer.country,
			 	points:cricketer.points,
			 	category:cricketer.category}
			})
			res.status(200).send({message:"player sent through socket"})
			// res.status(200).send({message:"Player done",
			// 	playername:cricketer.name,
			// 	basePrice:cricketer.basePrice,
			// 	country:cricketer.country,
			// 	points:cricketer.points,
			// 	category:cricketer.category});
		})
	})
	//res.status(200).send({message:"Player done",playername:"Shardul Thakur",basePrice:60,country:"India"});
}

exports.getresult = (req,res,next) => {
	Game.findOne({_id:req.body.gameid})
	.then((game)=>{
		const winner = game.players.reduce((prev,curr)=>{
				console.log('previous player',prev);
				return (prev.totalpoints<curr.totalpoints?curr:prev);
			})
		res.status(200).send({message:"Result",game:game.players,winner:winner});
		return;
	})
}