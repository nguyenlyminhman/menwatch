module.exports = async (req, res, next) => {
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        res.render('ad_staffAddNew', {
            user: req.user,
            csrfToken: req.csrfToken(),
            message: req.flash('info'),
            title: 'Add new staff ',
            breadcrumb: 'Add new staff',
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}
