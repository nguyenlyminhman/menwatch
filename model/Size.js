const queryDB = require('../utils/Database');

class Size {
    constructor(idsize, size_number) {
        this.idsize = idsize;
        this.size_number = size_number;
    }
    insertSize(){

    }
    static getSize() {
        const sql = 'select * from public."size" ORDER BY idsize ASC';
        return queryDB(sql, [])
            .then(result => result.rows);
    }
}
module.exports = Category;
