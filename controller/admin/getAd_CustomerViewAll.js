const Customer = require('../../model/Customer');

module.exports = async (req, res, next) => {

    let customer = await Customer.getAllCustomer();
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        res.render('ad_customerViewAll', {
            customer: customer.rows,
            user: req.user,
            title: 'Customer',
            breadcrumb: 'The Customer List ',
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}
