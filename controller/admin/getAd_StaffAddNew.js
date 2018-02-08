module.exports = async (req, res, next) => {
    try {
        res.render('ad_staffAddNew', {
            csrfToken: req.csrfToken(),
            message: req.flash('info'),
            title: 'Add new staff ',
            breadcrumb: 'Add new staff',
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}
