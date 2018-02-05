const Contact = require('../../model/Contact');

module.exports = async (req, res, next) => {
    try {
        let contact = await Contact.getAllContact();

        res.render('ad_ContactViewAll', {
            contact: contact.rows,
            // user: req.user,
            title: 'Contact ',
            breadcrumb: 'View all contact',
            // pages
        })
    } catch (err) {
        res.send('getAd_ContactViewAll error : ' + err);
    }
}
