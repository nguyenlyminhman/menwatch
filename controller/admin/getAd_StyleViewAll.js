const Style = require('../../model/Style');

module.exports = async (req, res, next) => {
    try {
        let style = await Style.getAllStyle();

        res.render('ad_styleViewAll', {
            style,
            // user: req.user,
            title: 'View all style',
            breadcrumb: 'All style',
            // pages
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}
