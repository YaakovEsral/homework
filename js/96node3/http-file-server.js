const http = require('http');
const fs = require('fs');
const port = 80;
const file = './index.html';
// const port = process.argv[2];
// const file = process.argv[3];


http.createServer((req, res) =>{

    const readStream = fs.createReadStream(file, 'utf8').pipe(res);

    res.setHeader('content-type', 'text/html')
    // readStream.on('data', data =>{
    //     console.log('received data');
    //     res.write(data);
    // })

    readStream.on('end', () => res.end());

    readStream.on('error', console.error);
    
    /*fs.readFile(__dirname + req.url, (err, data) =>{
        if(err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }

        res.writeHead(200);
        res.end(data);
    })*/
}).listen(port)