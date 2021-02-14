var express = require('express');
var router = express.Router();
const cors = require('cors');
// how to configure cors() - https://expressjs.com/en/resources/middleware/cors.html

const contacts = [
  {
    firstName: 'Joe',
    lastName: 'Biden',
    phone: '1234567890',
    email: 'jbiden@whitehouse.gov',
    id: 1
  },
  {
    firstName: 'Kamala',
    lastName: 'Harris',
    phone: '9876543210',
    email: 'kharris@whitehouse.gov',
    id: 2
  }
];

let numContacts = contacts.length;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('layout', {
    title: 'Contacts',
    contacts,
    noContacts: !contacts.length,
    // css: ['contacts'],
    partials: { content: 'contacts' }
  });
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
  contacts.push({...req.body, id: ++numContacts});
  console.log(contacts);
  res.redirect('/contacts');
});

// delete a contact

// #1. - for when the delete is made from the link, via a get request (default for links)
// router.get('/deleteContact/:id', (req, res) =>{
//     // console.log('get made');
//     // console.log(req.params.id);
//     const index = contacts.findIndex(c => c.id === +req.params.id)
//     console.log(req.params.id, index);
//     console.log(contacts[index]);
//     contacts.splice(index, 1);
//     res.redirect('/contacts')
// })

//#2. - when the delete is made from the form, via post

router.post('/deleteContact/:id', (req, res) =>{
    console.log(req.body);
    console.log('post made');

    const index = contacts.findIndex(c => c.id === +req.params.id)
    // console.log(req.params.id, index);
    // console.log(contacts[index]);
    contacts.splice(index, 1);
    res.redirect('/contacts')
})

//edit a contact
router.get('/editContact/:id', (req, res) =>{
    const index = contacts.findIndex(c => c.id === +req.params.id)
    // console.log(...contacts[index]);
    res.render('layout', {
        ...contacts[index],
        title: 'Edit Contact',
        partials: {content: 'editContact'}
    });
})

//posting to the edit contact endpoint
router.post('/editContact/:id', (req, res) =>{
    const index = contacts.findIndex(c => c.id === +req.params.id);
    console.log('after', contacts[index]);
    contacts[index] = {...req.body, id: contacts[index].id};
    console.log('after', contacts[index]);
    res.redirect('/contacts');
})

router.get('/api', cors(), (req, res) =>{
    // res.header('Access-Control-Allow-Origin', '*');
    res.json({contacts: contacts});
})

module.exports = router;
