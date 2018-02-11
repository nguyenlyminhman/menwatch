let Style = require('../../model/Style');
module.exports = async (req, res, next) => {

    const { id } = req.params;
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        let style = new Style(id);
        style.getStyleById().then(result => {
            res.render('ad_styleEdit', {
                csrfToken: req.csrfToken(),
                user: req.user,
                id: id,
                stylename: result.rows[0].stylename,
                message: req.flash('info'),
                title: 'Style ',
                breadcrumb: 'Edit style',
            })
        })

    } catch (err) {
        res.send('getAd_BrandAddNew error : ' + err);
    }
}
