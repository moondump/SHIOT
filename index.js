'use strict';

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.load();
const PORT = process.env.PORT || 3000;
const authRouter = require('./router/router.js');
const resourceRouter = require('./router/resource-router.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.MONGODB_URI);
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require('./lib/storage.js');

app.use('/', authRouter);
app.use('/', resourceRouter);


app.use((request, response) => {
  // have the server send back something
  // response.writeHead(200, {'Content-Type': 'text/html'});//test response
  // response.write('Testing Basic Server Response');//test response
  response.sendFile(__dirname + '/public/signin.html');
  // response.end();//test response
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});