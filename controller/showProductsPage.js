const Category = require('../model/Category');
const Producer = require('../model/Producer');
const Product = require('../model/Product');



module.exports = async (req, res) => {
    const { idcategory } = req.params;
    const product = new Product(undefined, undefined, idcategory, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    try {
        let mainMenu = await Category.getCategory();
        let brandMenu = await Producer.getProducer();
        let products = await product.getProductByCategory();
        res.render('products', { mainMenu, brandMenu, products })
    } catch (err) {
        res.send('Navigation menu erorr :' + err);
    }
}