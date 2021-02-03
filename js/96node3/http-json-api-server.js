const http = require('http');
const { parse } = require('querystring');
const port = process.argv[2];

http.createServer((req, res) => {
    // const theUrl = new URL(`https://localhost${req.url}`);
    const theUrl = new URL(req.url, 'https://localhost');
    // console.log(theUrl.pathname);
    res.writeHead(200, { 'Content-Type': 'application/json' })
    if (req.method === 'GET') {
        const queryParams = (parse(theUrl.search.substring(1)));
        // console.log(queryParams);
        const date = new Date(queryParams.iso);
        let dateObj;
        switch (theUrl.pathname) {
            case '/api/parsetime':
                // res.write('so you want the time');
                dateObj = {
                    hour: date.getHours(),
                    minute: date.getMinutes(),
                    second: date.getSeconds()
                }
                res.write(JSON.stringify(dateObj));
                break;
            case '/api/unixtime':
                dateObj = {
                    unixtime: date.getTime()
                }
                res.write(JSON.stringify(dateObj));
                break;
        }
        res.end();
    }

}).listen(port)