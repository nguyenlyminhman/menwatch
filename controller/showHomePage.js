const Brand = require('../model/Brand');

module.exports = async (req, res) => {
    try {
        let brand = await Brand.getBrand();
        // let subMenu = await menu.getParentCategory();
        res.render('index', { brand })
    } catch (err) {
        res.send('Navigation menu erorr :' + err);
    }
}
