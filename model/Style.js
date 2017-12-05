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

    addNewStyle(){
        let sql = 'INSERT INTO public."STYLE" (id, name) VALUES ($1, $2)';
        return queryDB
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