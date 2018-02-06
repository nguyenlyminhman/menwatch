const Style = require('../../model/Style');

module.exports = async (req, res, next) => {
    let { stylename } = req.body;
    let { id } = req.params;
    let style = new Style(id, stylename);
    style.updateStyle ()
        .then(result => {
            req.flash('info', 'The ' +  stylename + ' was updated.'),
            res.redirect('/admin/style/edit/' +id)
        })
        .catch(() => res.redirect('/admin/style/edit/' +id));
}