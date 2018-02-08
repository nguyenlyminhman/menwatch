const Staff = require('../../model/Staff');
let { sendEmail } = require('../../utils/Mailer');


module.exports = async (req, res, next) => {
    let { email, firstname, lastname, address, phone, role } = req.body;
    let staff = new Staff(undefined, undefined, email, undefined, undefined, undefined, undefined);
    let password = "";
    staff.checkExistStaff()
        .then(result => {
            if (result.rowCount > 0) {
                req.flash('info', email + ' is already in use.')
                res.redirect('/admin/staff/add-new')
            } else {
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
                for (var i = 0; i < 9; i++) {
                    password += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                //
                var content = `
                            <h3>Men Watch, </h3>
                            <p>Hello, ${email}</p>
                            <ul>
                                <li> Wellcom to MenWatch</ li>
                                <li> Your login email is: ${email} </ li>
                                <li> Your password is: ${password} </ li>
                                <li> You can sign in and change your new password whenever you want. </ li>
                                <li> This is an automated email. You do not need to respond to this email. </ li>
                            </ul>
                            <h4>Have nice day !</h4>
                            <h4><strong>Luxury Watch - FPT</strong></h4>
                        `;
                let _staff = new Staff(firstname, lastname, email, password, role, address, phone);
                _staff.signupStaff().then(
                    sendEmail(email, content).then(
                        req.flash('info', 'The new user has been added.'),
                        res.redirect('/admin/staff/add-new')
                    )
                )
            }
        })
        .catch(() => res.redirect('/admin/staff/add-new'));
}