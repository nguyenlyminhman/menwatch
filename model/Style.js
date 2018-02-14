const queryDB = require('../utils/DatabaseConnection');

class Style {
    //contructor of Style class.
    constructor(id, stylename) {
        this.id = id;
        this.stylename = stylename;
    }
    //get all style. using for navigation bar.
    static getAllStyle() {
        let sql = 'select * from public."Style" ORDER BY id ASC';
        return queryDB(sql, [])
            .then(result => result.rows);
    }
    // check style is existed or not.
    checkExistStyle() {
        const sql = 'select * from public."Style" WHERE stylename = $1';
        return queryDB(sql, [this.stylename])
    }
    //get style information by its id.
    getStyleById() {
        const sql = 'select * from public."Style" WHERE id = $1 ORDER BY id ASC';
        return queryDB(sql, [this.id])
    }
    //update style information by its id.
    updateStyle() {
        const sql = 'UPDATE public."Style" SET  stylename = $1  WHERE id =$2';
        return queryDB(sql, [this.stylename, this.id])
    }
    //delete style information by its id.
    deleteStyle() {
        const sql = 'DELETE FROM public."Style" WHERE id =$1';
        return queryDB(sql, [this.id])
    }
    //add new style to database.
    addNewStyle() {
        let sql = 'INSERT INTO public."Style" (stylename) VALUES ($1)';
        return queryDB(sql, [this.stylename])
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