const Staff = require('../../model/Staff');

module.exports = async (req, res, next) => {
    let { password } = req.body;
    let  id  = req.user.id;
    let staff = new Staff(undefined, undefined, undefined, password, undefined, undefined,undefined);
    staff.updatePassword(id)
        .then(result => {
            if (result.rowCount > 0) {
                req.flash('info', 'Your password was updated.'),
                    res.redirect('/admin/change-password-staff/' + id)
            } else {
                req.flash('info', 'Your password was not updated.'),
                res.redirect('/admin/change-password-staff/' + id)
            }
        })
        .catch(() => res.redirect('/admin/change-password-staff/'+id));
}