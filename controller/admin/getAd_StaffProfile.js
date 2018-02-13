const Staff = require('../../model/Staff');

module.exports = async (req, res, next) => {
    let { id } = req.params;
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Staff') {
        res.redirect('/admin/access-denied');
        return;
    }
    let staff = new Staff();
    try {
        staff.getStaffInfoById(id).then(result => {
            if (result.rowCount > 0) {
                res.render('ad_staffInformation', {
                    message: req.flash('info'),
                    csrfToken: req.csrfToken(),
                    staff: result.rows,
                    user: req.user,
                    title: 'Staff information',
                    breadcrumb: 'My information'
                })
            }
        })
    } catch (err) {
        res.send('getAd_StaffProfile error : ' + err);
    }
}
