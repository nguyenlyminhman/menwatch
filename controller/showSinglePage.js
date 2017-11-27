const Category = require('../model/Category');
const Producer = require('../model/Producer');
const Product = require('../model/Product');
const ProductDetails = require('../model/ProductDetails');
const Image = require('../model/Image');

module.exports = async (req, res) => {
    const { idproduct } = req.params;
    const product = new Product(idproduct, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    const image = new Image(undefined, idproduct, undefined);
    const size = new ProductDetails(idproduct, undefined);

    try {
        let mainMenu = await Category.getCategory();
        let brandMenu = await Producer.getProducer();
        let productDetails = await product.getProductById();
        let productImage = await image.getImageByProductId();
        let productSize = await size.getProductSize();

        res.render('single', {
            mainMenu, brandMenu,
            productDetails,
            productImage,
            productSize
        })
    } catch (err) {
        res.send('Navigation menu erorr :' + err);
    }
}