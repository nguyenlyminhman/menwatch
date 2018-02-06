const Style = require('../../model/Style');

module.exports = async (req, res, next) => {
    let { stylename } = req.body;
    let style = new Style(undefined, stylename);
    style.checkExistStyle()
        .then(result => {
            if (result.rowCount) {
                req.flash('info', stylename + ' is already in use. please, try add new other one.')
                res.redirect('/admin/style/add-new')
            } else {
                style.addNewStyle()
                    .then(
                    req.flash('info', stylename + ' was successfully added.'),
                    res.redirect('/admin/style/add-new')
                    )
            }
        })
        .catch(() => res.redirect('/admin/style/add-new'));
}