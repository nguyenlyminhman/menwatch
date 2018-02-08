const Contact = require('../../model/Contact');

module.exports = async (req, res) => {
    let { id } = req.params;
    try {
        let contact = new Contact(id);
        contact.getContactById().then(result => {
            res.render('ad_contactDetails', {
                contact: result.rows,
                title: 'Contact',
                breadcrumb: 'Contact details'
            });
        });
    } catch (err) {
        res.send('getAd_CustomerDetails error : ' + err);
    }
}
