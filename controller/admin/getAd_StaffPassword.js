const Staff = require('../../model/Staff');

module.exports = async (req, res, next) => {
    let { id } = req.params;
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Staff') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        res.render('ad_staffPassword', {
            message: req.flash('info'),
            csrfToken: req.csrfToken(),
            user: req.user,
            title: 'Staff information',
            breadcrumb: 'My password'

        })
    } catch (err) {
        res.send('getAd_StaffPassword error : ' + err);
    }
}
