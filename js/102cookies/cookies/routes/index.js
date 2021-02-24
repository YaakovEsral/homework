var express = require('express');
var router = express.Router();
const debug = require('debug')('cookies:index');
const db = require('../connection');
const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
})

// home page
router.get('/', (req, res, next) => {

    // create user info object from cookie or create a new default one
    const userInfo = req.cookies.userInfo ? JSON.parse(req.cookies.userInfo) : { timesVisited: 0, username: req.cookies.username || 'Stranger' };

    debug(userInfo);
    userInfo.timesVisited++;

    // might want to use locals again to access info on all routes

    // create new cookie
    res.cookie('userInfo', JSON.stringify(userInfo) /*, {maxAge: 10000}*/);

    res.render('layout', { title: 'Milim Game', userInfo, partials: { content: 'index' } });
})

// the login page
router.route('/login')
    .get((req, res, next) => {
        // let message;
        // // if user is being redirected from protected content, display the message
        // if(req.cookies.validationMessage) {
        //     message = 'You must log in to play the game.'
        // }
        res.render('layout', { title: 'Login', partials: { content: 'login' } });
    })
    .post((req, res, next) => {
        console.log(req.cookies.userInfo);

        db.query('SELECT EXISTS (SELECT username FROM users_info WHERE username = ?) as userExists',
            [req.body.username],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return res.writeHead(`Unable to validate user - error ${error.message}`)
                }
                if (results[0].userExists === 0) { // 0 = false in sql
                    res.cookie('validationMessage', 'User does not exist.');
                    return res.redirect('/login')
                }

                // overwrite the old cookie with the new user info
                const userInfo = JSON.parse(req.cookies.userInfo);
                userInfo.username = req.body.username;
                res.cookie('userInfo', JSON.stringify(userInfo));

                // if the user was initially redirected from protected content, redirect him back to the content
                if (req.cookies.validationMessage) {
                    return res.redirect('/game')
                }
                res.redirect('/');
            })
    })

// the "game" page (protected content)
router.get('/game', (req, res, next) => {
    const { username } = req.cookies.userInfo ? JSON.parse(req.cookies.userInfo) : '';
    if (username && username !== 'Stranger') {
        res.cookie('validationMessage', '')
        res.render('layout', { title: 'Game', partials: { content: 'game' } });
    } else {
        res.cookie('validationMessage', 'You must log in to play.');
        res.redirect('login');
    }

})


// create new account

// trying to figure out how to keep the user with the popup box open in case of invalid input
// one idea was to create a route login/createAccount and redirect to that, but geeksforgeeks is
// somehow able to pull it off without giving you a special route
router.post('/createAccount', (req, res, next) => {
    console.log('req body: ',req.body);
    const { error, value } = schema.validate({username: req.body.username});
    console.log(value);
    if(error) {
        console.log(error);
        // res.cookie('validationMessage', error.message);
        // res.locals.formValidationMessage = error.message;
        // none of the above are currently working so well, but it turns out that you can send HTML
        return res.send({
            html: `<p id="createAccountValidationMsg" class="validationMessage">${error.message}.</p>`,
            validationError: true,
            success: false
        });
    }
    db.query('INSERT into users_info (username) VALUES (?)', [req.body.username],
        (error, results, fields) => {
            if (error) {
                return res.writeHead(500, `Unable to create account - error${error.message}`);
            }
        })
    // res.cookie('validationMessage', 'Account successfully created! Log in to continue to the game.')
    // res.redirect('/login');
    res.send({
        html: `<p id="createAccountValidationMsg" class="createdAccountMessage">Account successfully created! Log in to continue.</p>`,
        validationError: false,
        success: true
    });
})

module.exports = router;
