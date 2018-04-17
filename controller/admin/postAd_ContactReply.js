const Contact = require('../../model/Contact');
let { removeSpace } = require('../../utils/Tools');
let { sendEmail } = require('../../utils/Mailer');

module.exports = async (req, res) => {
    //get current date.
    let { email, content } = req.body;
    let { id } = req.params;
    //init Contact model.
    let contact = new Contact(id);

    sendEmail(email, content).then(
        //Using updateContactStatus() method to update contact status.
        contact.updateContactStatus().then(result => {
            //result.rowCount > 0, that's mean, the contact content was sent.
            if (result.rowCount > 0) {
                req.flash('info', 'Your message has been sent to ' + email)
                res.redirect('/admin/contact/view-details/' + id)
            }
        })
    )
}