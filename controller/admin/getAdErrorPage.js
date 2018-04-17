module.exports = async (req, res, next) => {
    try {
        res.render('ad_error', {
            user: req.user,
            title: 'Error ',
            breadcrumb: 'Error page.',
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}