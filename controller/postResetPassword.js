const Customer = require('../model/Customer');
let { sendEmail } = require('../utils/Mailer');

module.exports = async (req, res, next) => {
    // get email value from customer.
    let { email } = req.body;
    //init Customer model.
    let customer = new Customer(undefined, undefined, email, undefined, undefined, undefined);
    //declare newPassword parameter.
    let newPassword = "";
    //using checkExistEmail() method to check customer email.
    customer.checkExistEmail().then(result => {
        //result.rowCount < 0, that's mean, the customer email do not exist.
        if (result.rowCount < 1) {
            //send the message to customer.
            req.flash('info', 'The email ' + email + ' is not exist. Please ! try again.')
            //redirecct to reset-password link
            res.redirect('/reset-password')
        } else {//otherwise, customer email exist.
            //declare alphabet parameter.
            var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
            //Using for loop to get random charater
            
            for (var i = 0; i < 9; i++) {
                //add to newPassword parameter.
                newPassword += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            }
            //content parameter to store the email content which will be send to customer.
            var content = `
                            <h3>Men Watch, </h3>
                            <p>Hello, ${result.rows[0].fistname} ${result.rows[0].lastname} </p>
                            <ul>
                                <li> You have requested to reset the account password on the Luxury Watch. </ li>
                                <li> Your new password is: ${newPassword} </ li>
                                <li> You can sign in and change your new password whenever you want. </ li>
                                <li> This is an automated email. You do not need to respond to this email. </ li>
                            </ul>
                            <h4>Have nice day !</h4>
                            <h4><strong>Luxury Watch - FPT</strong></h4>
                        `;
            //init Customer model with email and newPassword.
            let _customer = new Customer(undefined, undefined, email, newPassword, undefined, undefined);
            //Using updateCustomerPassword() method to update customer password.
            _customer.updateCustomerPassword()
                .then(_result => {
                    //_result.rowCount > 0, that's mean, the customer password was updated.
                    if (_result.rowCount > 0) {
                        //Using sendEmail() method to send to customer.
                        sendEmail(email, content).then(
                            req.flash('info', 'The new password has been sent to the email ' + email + '. Please ! Check your email.'),
                            res.redirect('/reset-password'),
                        )
                    }
                })
        }
    })
}
