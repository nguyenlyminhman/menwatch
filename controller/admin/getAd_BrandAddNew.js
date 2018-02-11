module.exports = async (req, res, next) => {
    //Check user role. If user is not admin role,
    //redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        res.render('ad_brandAddNew', {
            // csrfToken: req.csrfToken(),
            user: req.user,
            message: req.flash('info'),
            title: 'Add new brand ',
            breadcrumb: 'Add new brand',
        })
    } catch (err) {
        res.send('getAd_BrandAddNew error : ' + err);
    }
}
