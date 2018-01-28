const Brand = require('../model/Brand');
const Style = require('../model/Style');


module.exports = async (req, res) => {
    try {
        var messages = req.flash('error');

        let brand = await Brand.getAllBrand();
        let style = await Style.getAllStyle();

        res.render('register', {
            csrfToken: req.csrfToken(),
            message: req.flash('info'),
            brand,
            style,
            user: req.user,
            title: 'Register',
            messages: messages,
            hasErrors: messages.length > 0
        })

    } catch (err) {
        res.send('getRegisterPage error > ' + err);
    }
}
