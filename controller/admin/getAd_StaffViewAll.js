const Staff = require('../../model/Staff');

module.exports = async (req, res, next) => {
    try {
        let staff = await Staff.getAllStaff();
        res.render('ad_staffViewAll', {
            staff: staff.rows,
            user: req.user,
            title: 'Staff',
            breadcrumb: 'The Staff List' ,
        })
    } catch (err) {
        res.send('getAd_StaffViewAll error : ' + err);
    }
}
