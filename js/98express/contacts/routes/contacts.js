const express = require('express');
const router = express.Router();

const contacts = require('./files/contactList');

router.get('/', (req, res, next) =>{
    res.render('layout', 
    {
        title: 'Contacts Page',
        contacts: contacts,
        partials: {content: 'contacts'}
    })
})


module.exports = router;