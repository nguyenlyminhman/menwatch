const Brand = require('../model/Brand');
const Style = require('../model/Style');


module.exports = async (req, res) => {
    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();

        res.render('about', {
            // csrfToken: req.csrfToken(),
            brand,
            style,
            user: req.user,
            title: 'MenWatch-About page...'
        })
    } catch (err) {
        res.send('About page navigation error > ' + err);
    }
}
