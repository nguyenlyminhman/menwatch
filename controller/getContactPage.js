const Brand = require('../model/Brand');
const Style = require('../model/Style');


module.exports = async (req, res) => {
    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();

        res.render('contact', {
            // csrfToken: req.csrfToken(),
            brand,
            style,
            user: req.user,
            title: 'MenWatch-Contact page...'
        })
    } catch (err) {
        res.send('Contact page navigation error :' + err);
    }
}
