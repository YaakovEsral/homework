const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');

const path = require('path');

const indexRouter = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'dontTell',
    cookie: {

    },
    resave: false,
    saveUninitialized: false
}))

app.use('/', indexRouter);

app.locals.title = 'PCS MERN Blog';

app.listen(80)