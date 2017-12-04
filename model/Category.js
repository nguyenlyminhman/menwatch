const queryDB = require('../utils/DatabaseConnection');

class Category {
    constructor(idCategory, cateName, cateParent) {
        this.idCategory = idCategory;
        this.cateName = cateName;
        this.cateParent = cateParent
    }

    static getCategory() {
        const sql = 'select * from public."category" ORDER BY idcategory ASC';
        return queryDB(sql, [])
            .then(result => result.rows);
    }
}
module.exports = Category;
