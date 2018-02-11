const Staff = require('../../model/Staff');

module.exports = async (req, res, next) => {
    try {
        let staff = await Staff.getAllStaff();
        res.render('ad_staffViewAll', {
            staff: staff.rows,
            user: req.user,
            title: 'View all style',
            breadcrumb: 'All style',
        })
    } catch (err) {
        res.send('getAdHomePage error : ' + err);
    }
}
