module.exports = async (req, res, next) => {
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        res.render('ad_productReport', {
            user: req.user,
            title: 'Report',
            breadcrumb: '',
        })
    } catch (err) {
        res.send('getAd_OrderReport error : ' + err);
    }
}
