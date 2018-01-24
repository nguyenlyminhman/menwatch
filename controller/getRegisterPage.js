const Brand = require('../model/Brand');
const Style = require('../model/Style');


module.exports = async (req, res) => {
    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();

        res.render('register', {
            csrfToken: req.csrfToken(),
            brand,
            style,
            user: req.user,
            title: 'MenWatch-Register page...'
        })

    } catch (err) {
        res.send('Register page navigation error > ' + err);
    }
}
