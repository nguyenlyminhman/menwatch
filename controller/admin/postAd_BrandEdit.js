const Brand = require('../../model/Brand');
let { removeSpace } = require('../../utils/Tools');

module.exports = async (req, res, next) => {
    let { brandname } = req.body;
    let { id } = req.params;
    let brand = new Brand(id, removeSpace(brandname));
    brand.updateBrand()
        .then(result => {
            req.flash('info', 'The ' +  brandname + ' was updated.'),
            res.redirect('/admin/brand/edit/' +id)
        })
        .catch(() => res.redirect('/admin/brand/edit/' +id));
}