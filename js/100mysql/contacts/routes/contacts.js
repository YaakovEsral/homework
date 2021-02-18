var express = require('express');
var router = express.Router();
const connection = require('../connection');

/* GET home page. */
router.get('/', function (req, res, next) {
    connection.query('Select * FROM contacts', (error, results, fields) => {
        if (error) {
            return next(new Error(`Can't retrieve contacts - ${error.message}`))
        }

        res.render('layout', {
            title: 'Contacts',
            contacts: results,
            // noContacts: !contacts,
            // css: ['contacts'],
            partials: { content: 'contacts' }
        });

    })

});

//add a contact
router.get('/addContact', function (req, res, next) {
    res.render('layout', {
        title: 'Add Contact',
        partials: { content: 'addContact' }
    });
});

//post to the add contact page
router.post('/addContact', function (req, res, next) {
    //console.log(req.body);
    const { firstName, lastName, phone, email } = req.body;
    connection.query(
        'INSERT INTO contacts(firstName, lastName, phone, email) VALUES (?, ?, ?, ?)',
        [firstName, lastName, phone, email],
        (error, results, fields) => {
            if (error) {
                return next(new Error(`Failed to insert contact ${firstName} ${lastName} - ${error.message}`))
            };
            // debug(results);
            // res.status(201);
            res.redirect('/contacts');
        })

});

router.post('/api', (req, res, next) =>{
    console.log('post received', req.body);
    next();
})

router.post('/api', function (req, res, next) {
    //console.log(req.body);
    const { firstName, lastName, phone, email } = req.body;
    const contact = req.body;
    connection.query(
        'INSERT INTO contacts(firstName, lastName, phone, email) VALUES (?, ?, ?, ?)',
        [firstName, lastName, phone, email],
        (error, results, fields) => {
            if (error) {
                return next(new Error(`Failed to insert contact ${firstName} ${lastName} - ${error.message}`))
            };
            contact.id = results.insertId;
            // debug(results);
            res.status(201).send(contact);
            // res.redirect('/contacts');
        })

});

//#2. - when the delete is made from the form, via post

router.post('/deleteContact/:id', (req, res) => {
    console.log(req.body);
    console.log('post made');

    const index = contacts.findIndex(c => c.id === +req.params.id)
    // console.log(req.params.id, index);
    // console.log(contacts[index]);
    contacts.splice(index, 1);
    res.redirect('/contacts')
})

//edit a contact
router.get('/editContact/:id', (req, res) => {
    const index = contacts.findIndex(c => c.id === +req.params.id)
    // console.log(...contacts[index]);
    res.render('layout', {
        ...contacts[index],
        title: 'Edit Contact',
        partials: { content: 'editContact' }
    });
})

//posting to the edit contact endpoint
router.post('/editContact/:id', (req, res) => {
    const index = contacts.findIndex(c => c.id === +req.params.id);
    console.log('after', contacts[index]);
    contacts[index] = { ...req.body, id: contacts[index].id };
    console.log('after', contacts[index]);
    res.redirect('/contacts');
})

router.get('/api', (req, res) => {
    res.json({ contacts: contacts });
})

module.exports = router;