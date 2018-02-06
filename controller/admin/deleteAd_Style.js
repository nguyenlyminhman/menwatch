const Style = require('../../model/Style');

module.exports = async (req, res, next) => {
    let { id } = req.params;
    let style = new Style(parseInt(id), undefined);
    style.deleteStyle()
        .then(result => {
            req.flash('info', 'Deleted successfully.'),
            res.redirect('/admin/style/view-all');
        })
        .catch(() => res.redirect('/admin/style/view-all'));
}