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
}
module.exports = Brand;
