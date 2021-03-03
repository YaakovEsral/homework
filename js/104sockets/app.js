const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIo = require('socket.io')(server);

const path = require('path');
const { isObject } = require('util');
app.use(express.static(path.join(__dirname, 'public')));

const users = [];

socketIo.on('connection', socket => {
    // console.log('server got a connection');
    // socket.emit('serverMessage', 'message sent from the server')

    users.push({socketId: socket.id});

    socket.on('login', (name, callback) => {
        // console.log(name);
        name = name.trim();

        if (!name) {
            return callback('Please enter a username.');
        }

        if (users.some(u => u === name)) {
            return callback(`Sorry, the name "${name}" is taken.`);
        } else {
            callback();
            const index = users.findIndex(u => u.socketId === socket.id); // we assign based on this algo in case someone else logs in while this user is entering a name
            users[index].name = name;
            socketIo.emit('newChatter', name);
            socket.on('clientMessage', msg => {
                // console.log(msg);
                if (msg.recipient === 'Everyone') {
                    socketIo.emit('serverMessage', { msg: msg.message, name, time: new Date().toLocaleTimeString() })
                } else {
                    const index = users.findIndex(u => u.name === msg.recipient);
                    socketIo.to(users[index].socketId).emit('serverMessage', { msg: msg.message, name, time: new Date().toLocaleTimeString() })
                    // console.log('the message was for ', msg.recipient);
                }
            })

            socket.on('clientTypingMessage', () => {
                socket.broadcast.emit('serverTypingMessage', name);
            })

        }
        console.log(users);
    });

})




app.use('/', (req, res, next) => {
    res.send('Hello world!')
})

server.listen(80);