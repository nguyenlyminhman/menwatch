const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Product = require('../model/Product');
const Cart = require('../model/Cart');

module.exports = async (req, res, next) => {
    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let product = await Product.getAllProduct();

        // data.image[Object.keys(data.image)[2]]
        // console.log(JSON.stringify(cartt.items));
        // console.log(JSON.parse(JSON.stringify(cartt.items)));
        // console.log(cartt.item[Object.keys(cartt.item)[0]]);

        if (!req.session.cart) {
            return res.render('shopping_cart', { brand,
                // csrfToken: req.csrfToken(),
                style,
                product,
                cartItem: null,
                title: 'My shopping bag...',
                user: req.user })
        }
        var cart = new Cart(req.session.cart);
        // // console.log(cart);
        // console.log('....................................................');
        // console.log(cart.getItems())
        // Object.keys(cart.items).forEach(function (key) {
        //     console.log(key + ' = ' + cart.items[key].name);
        // });
        res.render('shopping_cart', {
            // csrfToken: req.csrfToken(),
            brand,
            style,
            product,
            cartItem: cart.getItems(),
            title: 'My shopping bag',
            user: req.user
        })
    } catch (err) {
        res.send('getShoppingCartPage error : ' + err);
    }
}
