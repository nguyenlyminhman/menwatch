const Customer = require('../../model/Customer');

module.exports = async (req, res, next) => {
    try {
        let customer = await Customer.getAllCustomer();

        res.render('ad_customerViewAll', {
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
