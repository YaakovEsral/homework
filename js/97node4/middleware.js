const connect = require('connect');
const app = connect();
const servePage = require('./servePage');

app.use((req, res, next) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    const url = new URL(`https://${req.headers.host}${req.url}`);
    if (url.searchParams.get('magicWord') === 'please') {
        req.magicWord = true;
    }
    // res.end();
    next();
})

app.use('/home', (req, res, next) => {
    servePage(req, res, 'home');
    res.end();
    next();
})

app.use('/about', (req, res, next) => {
    servePage(req, res, 'about');
    res.end();
})

app.listen(80);