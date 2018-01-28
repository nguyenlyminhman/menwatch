const Customer = require('../model/Customer');
let { sendEmail } = require('../utils/Mailer');

module.exports = async (req, res, next) => {
    // get email value from user
    let { email } = req.body;
    let customer = new Customer(undefined, undefined, email, undefined, undefined, undefined);
    let newPassword = "";
    customer.checkExistEmail().then(result => {
        if (!result.rowCount) {
            req.flash('info', 'The email ' + email + ' is not exist. Please ! try again.')
            res.redirect('/reset-password')
        } else {
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
            for (var i = 0; i < 9; i++) {
                newPassword += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            //
            var content = `
                            <h3>Luxury Watch, </h3>
                            <p>Hello, ${email}</p>
                            <ul>
                                <li> You have requested to reset the account password on the Luxury Watch. </ li>
                                <li> Your new password is: ${newPassword} </ li>
                                <li> You can sign in and change your new password whenever you want. </ li>
                                <li> This is an automated email. You do not need to respond to this email. </ li>
                            </ul>
                            <h4>Have nice day !</h4>
                            <h4><strong>Luxury Watch - FPT</strong></h4>
                        `;
            let _customer = new Customer(undefined, undefined, email, newPassword, undefined, undefined);
            _customer.updateCustomerPassword()
                .then(
                sendEmail(email, content).then(
                    req.flash('info', 'The new password has been sent to the email ' + email + '. Please ! Check your email.'),
                    res.redirect('/reset-password'),
                )
                )
        }
    })
}
