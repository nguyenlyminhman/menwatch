module.exports = async (req, res, next) => {
    try {
        res.render('ad_AccessDenied', {
            user: req.user,
            title: 'Home ',
            breadcrumb: 'Access denied'
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}
