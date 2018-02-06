module.exports = async (req, res, next) => {
    try {
        res.render('ad_brandAddNew', {
            // csrfToken: req.csrfToken(),
            // user: req.user,
            message: req.flash('info'),
            title: 'Add new brand ',
            breadcrumb: 'Add new brand',
            // pages
        })
    } catch (err) {
        res.send('getAd_BrandAddNew error : ' + err);
    }
}
