const http = require('http');
const fs = require('fs');
const path = require('path');

const contentTypes = {
    html: 'text/html',
    js: 'text/js',
    css: 'text/css'
}

http.createServer(async (req, res) => {
    console.log(req.url);


    if (req.url === '/') {
        res.statusCode = 301;
        res.setHeader('Location', '/index.html')
    }
    else {

        // (async () =>{
        // try {
        const readStream = fs.createReadStream(`public/${req.url}`, 'utf8');

        const ext = path.extname(req.url);
        res.setHeader('content-type', contentTypes[ext ? ext.substring(1) : 'html'])
        readStream.on('data', data => {
            // console.log('received data');
            res.write(data);
            // console.log('after writing');
        })

        readStream.on('end', () => {
            console.log('finished reading data');
            res.end();
        })

        // }
        // catch(err){
        readStream.on('error', err => {
            switch (err.code) {
                case 'ENOENT':
                    res.statusCode = 404;
                    res.write('No such page. 404')
                    break;
                default:
                    res.statusCode = 500;
                    res.write('Unknown server error');
            }
            res.statusCode = 500;
            res.write(err.message);
            res.end();
        })
        
// }   
// })();
// res.end();
}}).listen(80);