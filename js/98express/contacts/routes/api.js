const express = require('express');
const router = express.Router();

const contacts = require('./files/contactList');

router.get('/contacts', (req, res, next) =>{
    res.json({contacts: contacts});
    // next();
})

router.post('/contacts', (req, res, next) =>{
    const name = req.body.name;
    const email = req.body.email;
    contacts.push({name: name, email: email});
    // console.log(contacts);
    res.json({contacts: contacts});

})

module.exports = router;