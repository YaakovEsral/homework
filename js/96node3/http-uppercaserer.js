const http = require('http');
const fs = require('fs');
const map = require('through2-map');
const port = process.argv[2];// 80;

http.createServer((req, res) => {
    if (req.method === 'POST') {
        req.pipe(map(chunk => {
            return chunk.toString().toUpperCase();
        })).pipe(res);
    }
    // res.end();
}).listen(port);