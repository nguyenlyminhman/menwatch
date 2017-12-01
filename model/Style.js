const queryDB = require('../utils/DatabaseConnection');

class Style {
    constructor(id, stylename) {
        this.id = id;
        this.stylename = stylename;
    }
    static getProducer() {
        let sql = 'select * from public."Style" ORDER BY id ASC';
        return queryDB(sql, [])
            .then(result => result.rows);
    }
}
module.exports = Style;

// Producer.getProducer()
// .then(a => console.log(a))
// .catch(err=> console.log(err));