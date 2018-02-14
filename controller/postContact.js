const Contact = require('../model/Contact');

module.exports = async (req, res) => {
    //get current date.
    var currentdate = new Date().getFullYear() + '-' + (new Date().getUTCMonth() + 1) + '-' + new Date().getDate();
    //get all value from contact form.
    let { email, fullname, phone, message } = req.body;
    //init Contact model.
    let contact = new Contact(undefined, email, fullname, phone, message, "Pending", currentdate);
    //Using addNewContact() method to save.
    contact.addNewContact().then(result => {
        //result.rowCount > 0, that's mean, the contact content was sent.
        if (result.rowCount > 0) { 
            req.flash('info', 'Thank you for your contact information.')
            res.redirect('/contact')
        }else{
            req.flash('info', 'Your contact information was refused.')
            res.redirect('/contact')
        }
    })
}