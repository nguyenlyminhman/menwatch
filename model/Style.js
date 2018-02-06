const queryDB = require('../utils/DatabaseConnection');

class Style {
    constructor(id, stylename) {
        this.id = id;
        this.stylename = stylename;
    }
    static getAllStyle() {
        let sql = 'select * from public."Style" ORDER BY id ASC';
        return queryDB(sql, [])
            .then(result => result.rows);
    }
    checkExistStyle() {
        const sql = 'select * from public."Style" WHERE stylename = $1';
        return queryDB(sql, [this.stylename])
    }
    getStyleById() {
        const sql = 'select * from public."Style" WHERE id = $1 ORDER BY id ASC';
        return queryDB(sql, [this.id])
            .then(result => result.rows[0].stylename);
    }

    addNewStyle(){
        let sql = 'INSERT INTO public."Style" (stylename) VALUES ($1)';
        return queryDB(sql,[this.stylename])
    }
}
module.exports = Style;

// let style = new Style(', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
// pro.insertNewProduct()
// .then(() => console.log('ok man'))
// .catch(err=> console.log(err));

// product.getProductById()
// .then(s => console.log(s))
// .catch(w => console.log('not found' + w));