const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Customer = require('../model/Customer');
const Order = require('../model/Order');

module.exports = async (req, res) => {
    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let _customer = new Customer(undefined, undefined, req.user.email, undefined, undefined, undefined);


        _customer.checkExistEmail().then(result => {
            let _order = new Order(undefined, result.rows[0].id, undefined, undefined, undefined, undefined, undefined, undefined, );
            _order.getOrderInfoByCustomerId().then(orderResult => {
                res.render('profile', {
                    message: req.flash('info'),
                    brand,
                    style,
                    user: req.user,
                    customer: result.rows[0],
                    order: orderResult.rows,
                    title: 'My profile'
                });
            });

        })
    } catch (err) {
        res.send('getProfilePage error : ' + err);
    }
}
