const Customer = require('../../model/Customer');

module.exports = async (req, res, next) => {
    try {
        let customer = await Customer.getPopularCustomer();

        res.render('ad_customerPopular', {
            customer: customer.rows,
            // user: req.user,
            title: 'Customer',
            breadcrumb: 'View all customer ',
            // pages
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}
