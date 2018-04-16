const Brand = require('../../model/Brand');
let { removeSpace } = require('../../utils/Tools');

module.exports = async (req, res, next) => {
    let { brandname } = req.body;
    let brand = new Brand(undefined, removeSpace(brandname));
    brand.checkExistBrand()
        .then(result => {
            if (result.rowCount) {
                req.flash('info', brandname + ' is already in use. please, try add new other one.')
                res.redirect('/admin/brand/add-new')
            } else {
                brand.addNewBrand()
                    .then(
                    req.flash('info', brandname + ' was successfully added.'),
                    res.redirect('/admin/brand/add-new')
                    )
            }
        })
        .catch(() => res.redirect('/register'));
}