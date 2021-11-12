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
		let cricketers = [{name:"SHARDUL THAKUR",basePrice:60,country:"INDIA",points:90,category:"ALL-ROUNDER"},
		{name:"AB DE VILLIERS",basePrice:45,country:"SOUTH AFRICA",points:90,category:"WICKET KEEPER BATSMAN"},
		{name:"QUINTON DE KOCK",basePrice:45,country:"SOUTH AFRICA",points:90,category:"WICKET KEEPER BATSMAN"},
		{name:"CHRIS MORRIS",basePrice:35,country:"SOUTH AFRICA",points:90,category:"ALL-ROUNDER"},
		{name:"KAGISO RABADA",basePrice:55,country:"SOUTH AFRICA",points:90,category:"RIGHT-ARM FAST BOWLER"},
		{name:"FAF DU PLESIS",basePrice:50,country:"SOUTH AFRICA",points:90,category:"RIGHT-HAND BATTER"},
		{name:"ANRICH NORTJE",basePrice:40,country:"SOUTH AFRICA",points:90,category:"RIGHT-ARM FAST BOWLER"},
		{name:"GLENN MAXWELL",basePrice:55,country:"AUSTRALIA",points:90,category:"ALL-ROUNDER"},
		
		{name:"STEVE SMITH",basePrice:30,country:"AUSTRALIA",points:90,category:"RIGHT-HAND BATTER"},
		{name:"DAVID WARNER",basePrice:40,country:"AUSTRALIA",points:90,category:"LEFT-HAND BATTER"},
		{name:"JOSH HAZLEWOOD",basePrice:50,country:"AUSTRALIA",points:90,category:"RIGHT-ARM FAST BOWLER"},
		{name:"MARCUS STOINIS",basePrice:45,country:"AUSTRALIA",points:90,category:"ALL-ROUNDER"},
		{name:"VIRAT KOHLI",basePrice:65,country:"INDIA",points:90,category:"RIGHT-HAND BATTER"},
		{name:"ROHIT SHARMA",basePrice:70,country:"INDIA",points:90,category:"RIGHT-HAND BATTER"},
		{name:"KL RAHUL",basePrice:55,country:"INDIA",points:90,category:"WICKET KEEPER BATSMAN"},
		{name:"RISHABH PANT",basePrice:60,country:"INDIA",points:90,category:"WICKET KEEPER BATSMAN"},
		{name:"RAVINDRA JADEJA",basePrice:55,country:"INDIA",points:90,category:"ALL-ROUNDER"},
		{name:"JASPRIT BUMRAH",basePrice:50,country:"INDIA",points:90,category:"RIGHT-ARM FAST BOWLER"},
		{name:"MOHAMMAD SHAMI",basePrice:55,country:"INDIA",points:90,category:"RIGHT-ARM FAST BOWLER"},
		{name:"YUZVENDRA CHAHAL",basePrice:60,country:"INDIA",points:90,category:"RIGHT-ARM SPIN BOWLER"},
		 {name:"PRITHVI SHAW",basePrice:60,country:"INDIA",points:90,category:"RIGHT-HAND BATTER"},
		
		{name:"RUTURAJ GAIKWAD",basePrice:60,country:"INDIA",points:90,category:"RIGHT-HAND BATTER"},
		{name:"JOS BUTTLER",basePrice:60,country:"ENGLAND",points:90,category:"WICKET KEEPER BATSMAN"},
		{name:"BEN STOKES",basePrice:65,country:"ENGLAND",points:90,category:"ALL-ROUNDER"},
		]
		let players = [{name:user.userName,totalpoints:0,moneyleft:20000000}];
		const game = new Game({owner:user.userName,players:players,cricketers:cricketers});
		game.save()
		.then((result)=>{
			console.log("result of creating ", result);

			io.getIO().sockets.on('connection',socket=>{
				//socket.join(gameID);
				console.log("tryed joining");
				socket.on('room', function(room) {
        			socket.join(room);
    			});
    			console.log("socket details",socket.rooms);
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
		const obj = { name:userName,totalpoints:0,moneyleft:20000000};
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
    			console.log("socket details",socket.rooms);
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