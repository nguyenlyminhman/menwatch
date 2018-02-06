let Style = require('../../model/Style');
module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;
        let style = new Style(id);
        style.getStyleById().then(result => {
            res.render('ad_styleEdit', {
                csrfToken: req.csrfToken(),
                // user: req.user,
                id:id,
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
