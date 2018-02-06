module.exports = async (req, res, next) => {
    try {
        res.render('ad_styleAddNew', {
            csrfToken: req.csrfToken(),
            message: req.flash('info'),
            title: 'Add new style ',
            breadcrumb: 'Add new style',
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}
