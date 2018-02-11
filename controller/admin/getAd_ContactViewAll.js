const Contact = require('../../model/Contact');

module.exports = async (req, res, next) => {

    let contact = await Contact.getAllContact();
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        res.render('ad_ContactViewAll', {
            contact: contact.rows,
            user: req.user,
            title: 'Contact ',
            breadcrumb: 'View all contact',
            // pages
        })
    } catch (err) {
        res.send('getAd_ContactViewAll error : ' + err);
    }
}
