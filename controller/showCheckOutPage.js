const Category = require('../model/Category');

module.exports = async (req, res) => {
    try {
        let mainMenu = await Category.getCategory();
        // let subMenu = await menu.getParentCategory();
        res.render('checkout', { mainMenu })
    } catch (err) {
        res.send('Navigation menu erorr :' + err);
    }
}