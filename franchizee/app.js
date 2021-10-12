const express = require('express');
const bodyParser = require('body-parser');
const playersroutes = require('./routes/players');
const authroutes = require('./routes/auth');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
console.log("Inside server");
app.use((req,res,next)=>{
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

var corsOptions = {
  origin:"https://localhost:8080"
};

// app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(playersroutes);
app.use(authroutes);

mongoose
  .connect('mongodb+srv://darshan:msdhoni@cluster0.oantu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(result => {
    console.log(result);
    app.listen(8080);
  })
  .catch(err => {
    console.log(err);
  });


