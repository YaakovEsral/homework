const net = require('net');
// const portNum = process.argv[2];
const portNum = 80;

const server = net.createServer(socket =>{
    // console.log('connected');

    socket.on('end', () =>{
        console.log('disconnected');
    })

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const mins = date.getMinutes().toString().padStart(2, '0');
    const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours}:${mins}\n`;

    socket.write(dateString);
    socket.end("");
}).listen(portNum);

server.on('error', err => console.error(err));