const express = require('express');
const cors = require('cors');
const http = require('http');
const initializeWebSocket = require('./websockets');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');


const app = express();
app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);



app.get('/', (req, res) => {
  res.send('<h1>Welcome to the HTTP Server with Express!</h1>');
});

mongoose.connect('mongodb://localhost:27017/Database2')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));



    app.use('/api', routes);


initializeWebSocket(server);

server.listen(8080, () => {
    console.log('Server started on http://localhost:8080');
});
