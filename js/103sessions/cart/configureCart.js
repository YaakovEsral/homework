const Cart = require("./cart");

module.exports = (req, res, next) => {
    req.session.cart = new Cart(req.session.cart ? req.session.cart.items : {} );
    // console.log(typeof cart, cart);
    next();
}