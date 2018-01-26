const Brand = require('../model/Brand');
const Style = require('../model/Style');
const Customer = require('../model/Customer')

module.exports = async (req, res) => {
    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        let _customer = new Customer(undefined,undefined, req.user.email, undefined,undefined, undefined);

        _customer.checkExistEmail().then(result => {
            res.render('customer_info', {
                message: req.flash('info'),
                brand,
                style,
                user: req.user,
                customer: result.rows[0],
                title: 'My information'
            });
        })
    } catch (err) {
        res.send('Customer information error : ' + err);
    }
}

