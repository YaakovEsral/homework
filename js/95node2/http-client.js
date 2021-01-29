const http = require('http');

http.get(process.argv[2], (res) => {

    res.on('error', err => {
        console.error(err);
    })

    res.setEncoding('utf8');
    res.on('data', data => {
        // console.log('Received data');
        console.log(data);
    })

    res.on('end', () => {
        // console.log('finished receiving data')
    })
})