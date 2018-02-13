const Staff = require('../../model/Staff');

module.exports = async (req, res, next) => {
    let { id } = req.params;
    //Check user role. If user is not admin role, redirect to access denied page.
    // console.log(req.user.role);
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    let staff = new Staff();
    try {
        staff.getStaffInfoById(id).then(result => {
            if (result.rowCount > 0) {
                res.render('ad_adminInformation', {
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
        res.send('getAd_AdminProfile error : ' + err);
    }
}
