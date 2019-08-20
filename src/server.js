const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectUsers = {};

io.on('connection', socket => {
     const { user } = socket.handshake.query;
     connectUsers[user] = socket.id;



    // console.log('Nova conexão', socket.id);

    // socket.on('Hello', message => {
    //     console.log(message);
    // });
});
// get , post, put e delete

mongoose.connect('mongodb+srv://omnistack:ii112321@cluster0-fugfo.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.connectUsers = connectUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);