const Staff = require('../../model/Staff');
let { removeSpace } = require('../../utils/Tools');

module.exports = async (req, res, next) => {
    //get parameter from ad_staffinformation ejs page.
    let { firstname, lastname, address, phone } = req.body;
    let { id } = req.params;
    //init Staff model
    let staff = new Staff(removeSpace(firstname), removeSpace(lastname), undefined, undefined, undefined, removeSpace(address), phone);
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