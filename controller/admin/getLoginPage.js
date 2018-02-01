// const Brand = require('../model/Brand');
// const Style = require('../model/Style');

module.exports = async (req, res) => {
    try {
        res.render('ad_login', { 
            // csrfToken: req.csrfToken(),
            // message: req.flash('info'),
            user: req.user,
            title: 'Admin | Login'
        });
    } catch (err) {
        res.send('getLoginPage error : ' + err);
    }
}
