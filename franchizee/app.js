const express = require('express');
const bodyParser = require('body-parser');
const playersroutes = require('./routes/players');
const gamehandlerroutes = require('./routes/gamehandler');
const authroutes = require('./routes/auth');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
console.log("reached before cors");
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.post('/Sample',(req,res,next)=>{
  console.log("Inside sample");
  res.status(200).send({message:"It worked"});
})
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
// app.use((req,res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept"
//   );
//   next();
// });

app.use(bodyParser.json());

// var corsOptions = {
//   origin:"http://localhost:8080"
// };

// app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });
console.log("right before ghr");
app.use(gamehandlerroutes);
app.use(playersroutes);
app.use(authroutes);
console.log("right after ghr");

mongoose
  .connect('mongodb+srv://darshan:msdhoni@cluster0.oantu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(result => {
    // const server = app.listen(8080);
    // const io = require('./socket').init(server);
    // io.on('connection', socket => {
    //   console.log('Client connected');
    // })
    const server = app.listen(8080);
        // const io = require('socket.io')(server, {
        //     cors: {
        //         origin: "http://localhost:3000",
        //         methods: ["GET", "POST"]
        //     }
        // });
        // io.on('connection',socket=>{
        //   console.log("Client connected")
        // })
            const io = require('./socket').init(server);
     
    io.on('connection', socket => {
        console.log('Client Connected'); 
    });
  })
  .catch(err => {
    console.log(err);
  });


