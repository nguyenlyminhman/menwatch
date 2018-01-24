const queryDB = require('../utils/DatabaseConnection');

class Brand {
    constructor(id, brandname) {
        this.id = id;
        this.brandname = brandname;
    }

    static getAllBrand() {
        const sql = 'select * from public."Brand" ORDER BY id ASC';
        return queryDB(sql, [])
            .then(result => result.rows);
    }
    getBrandById() {
        const sql = 'select * from public."Brand" WHERE id = $1 ORDER BY id ASC';
        return queryDB(sql, [this.id])
            .then(result => result.rows[0].brandname);
    }
}
module.exports = Brand;

// Brand.getAllBrand().then(rs => {
//     console.log(JSON.stringify(rs))
// }
// )
// let a = new Brand(1, undefined)

// a.getBrandById().then(a => {
//     console.log(JSON.stringify(a));
// }
// );
