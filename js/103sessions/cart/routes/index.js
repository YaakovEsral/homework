var express = require('express');
const Cart = require('../cart');
var router = express.Router();

router.use(require('../configureCart'));

/* GET home page. */
router.route('/')
  .get((req, res, next) => {
    res.render('layout', { title: 'Express', partials: { content: 'index' }, items: global.items });
  })
  .post((req, res, next) => {
    const cart = req.session.cart || new Cart();

    console.log('inside post', cart.constructor);


    // console.log('cart from config', req.session.cart);
    console.log('before add', cart);
    cart.addItem(req.body.id, +req.body.count);
    console.log('after add', cart);

    req.session.cart = cart;
    req.session.foo = 5;

    // 1 - added - we never ended the request so session cookie wasnt sent back
    res.redirect('/');
  })

  router.get('/viewCart', (req, res, next) =>{
    //   console.log(req.session.cart);
      const keys = Object.keys(req.session.cart.items);
    //   console.log('keys', keys);
      const values = Object.values(req.session.cart.items);
    //   console.log('values', values);
      const total = Math.min(keys.length, values.length);
      const cartAsArray = [];
      for (let i = 0; i < total; i++) {
          cartAsArray.push({id: keys[i], count: values[i]})
      }
      console.log('array', cartAsArray);
      res.render('layout', {title: 'Your Shopping Cart', partials: {content: 'viewCart'}, cartAsArray, items: req.session.cart.items});
  })

module.exports = router;
