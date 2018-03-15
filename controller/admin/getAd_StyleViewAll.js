const Style = require('../../model/Style');

module.exports = async (req, res, next) => {
    //Check user role. If user is not admin role, redirect to access denied page.
    if (req.user.role !== 'Admin') {
        res.redirect('/admin/access-denied');
        return;
    }
    try {
        let style = await Style.getAllStyle();

        res.render('ad_styleViewAll', {
            style,
            user: req.user,
            message: req.flash('info'),
            title: 'View all style',
            breadcrumb: 'All style',
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}
