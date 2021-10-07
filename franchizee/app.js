const express = require('express');
const bodyParser = require('body-parser');
const playersroutes = require('./routes/players');
const authroutes = require('./routes/auth');
const app = express();
const mongoose = require('mongoose');
console.log("Inside server")

app.use(bodyParser.json());

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


