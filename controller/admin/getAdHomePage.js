module.exports = async (req, res, next) => {
    try {
        res.render('ad_index', {
            user: req.user,
            title: 'Home ',
            breadcrumb: 'Dashboard',
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}
