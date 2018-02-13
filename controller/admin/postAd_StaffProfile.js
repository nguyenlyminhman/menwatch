const Staff = require('../../model/Staff');

module.exports = async (req, res, next) => {
    //get parameter from ad_staffinformation ejs page.
    let { firstname, lastname, address, phone } = req.body;
    let { id } = req.params;
    //init Staff model
    let staff = new Staff(firstname, lastname, undefined, undefined, undefined, address, phone);
    //using updateInformation to update new information.
    staff.updateInformation(id)
        .then(result => {
            if (result.rowCount > 0) { //check results (success: rowCount = 1, fail: rowCount = 0)
                //send successfully notification to user.
                req.flash('info', 'Your information was updated.'),
                    //redirect to current page
                    res.redirect('/admin/profile-staff/' + id)
            } else {
                //send fail notification to user.
                req.flash('info', 'Your information was not updated.'),
                    //redirect to current page
                    res.redirect('/admin/profile-staff/' + id)
            }
        })
        .catch(() => res.redirect('/admin/profile-staff/' + id));
}