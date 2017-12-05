const Brand = require('../model/Brand');
const Style = require('../model/Style');


module.exports = async (req, res) => {
    try {
        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();
        
        res.render('index', { brand, style })
    } catch (err) {
        res.send('Navigation menu erorr :' + err);
    }
}
