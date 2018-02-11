const Contact = require('../../model/Contact');

module.exports = async (req, res) => {

    let { id } = req.params;
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        let contact = new Contact(id);
        contact.getContactById().then(result => {
            res.render('ad_contactDetails', {
                user: req.user,
                contact: result.rows,
                title: 'Contact',
                breadcrumb: 'Contact details'
            });
        });
    } catch (err) {
        res.send('getAd_CustomerDetails error : ' + err);
    }
}
