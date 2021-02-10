var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('layout',
        {
            title: 'Express',
            partials: { content: 'index' }
        });
});

router.get('/foo', function (req, res, next) {
    res.render('index', { title: 'Foo' });
});

router.get('/bar', function (req, res, next) {
    res.render('index', { title: 'Bar' });
});


module.exports = router;
