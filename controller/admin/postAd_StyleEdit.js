const Style = require('../../model/Style');
let {removeSpace} = require('../../utils/Tools');

module.exports = async (req, res, next) => {
    let { stylename } = req.body;
    let { id } = req.params;
    let style = new Style(id, removeSpace(stylename));
    style.updateStyle ()
        .then(result => {
            req.flash('info', 'The ' +  stylename + ' was updated.'),
            res.redirect('/admin/style/edit/' +id)
        })
        .catch(() => res.redirect('/admin/style/edit/' +id));
}