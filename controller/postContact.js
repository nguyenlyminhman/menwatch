const Contact = require('../model/Contact');
module.exports = async (req, res) => {
    var currentdate = new Date().getFullYear() + '-' + (new Date().getUTCMonth() + 1) + '-' + new Date().getDate();

    let { email, fullname, phone, message } = req.body;
    let contact = new Contact(undefined, email, fullname, phone, message, "Pending", currentdate);
    contact.addNewContact().then(result => {
        if(result.rowCount>0){
            res.redirect('/')
        }
    })
}