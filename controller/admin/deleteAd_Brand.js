const Brand = require('../../model/Brand');

module.exports = async (req, res, next) => {
    let { id } = req.params;
    let brand = new Brand(parseInt(id), undefined);
    brand.deleteBrand()
        .then(result => {
            req.flash('info', 'Deleted successfully.'),
            res.redirect('/admin/brand/view-all');
        })
        .catch(() => res.redirect('/admin/brand/view-all'));
}