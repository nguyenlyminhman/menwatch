const Contact = require('../model/Contact');
module.exports = async (req, res) => {
    var currentdate = new Date().getFullYear() + '-' + (new Date().getUTCMonth() + 1) + '-' + new Date().getDate();

    let { email, fullname, phone, message } = req.body;
    let contact = new Contact(email, fullname, phone, message, "pending", currentdate);
    contact.addNewContact().then(result => {
        if(result.rowCount){
            res.redirect('/')
        }
    })
}