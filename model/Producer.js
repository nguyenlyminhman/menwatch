const queryDB = require('../utils/DatabaseConnection');

class Producer {
    constructor(idproducer, producer_name) {
        this.idproducer = idproducer;
        this.roducer_name = producer_name;
    }
    static getProducer() {
        let sql = 'select * from public."producer" ORDER BY idproducer ASC';
        return queryDB(sql, [])
            .then(result => result.rows);
    }
}
module.exports = Producer;

// Producer.getProducer()
// .then(a => console.log(a))
// .catch(err=> console.log(err));