const queryDB = require('../utils/DatabaseConnection');

class Brand {
    //contructor for Brand Model.
    constructor(id, brandname) {
        this.id = id;
        this.brandname = brandname;
    }
    //get all brand
    static getAllBrand() {
        const sql = 'select * from public."Brand" ORDER BY id ASC';
        return queryDB(sql, [])
            .then(result => result.rows);
    }
    //this method using for check existed brand.
    checkExistBrand() {
        const sql = 'select * from public."Brand" WHERE brandname = $1';
        return queryDB(sql, [this.brandname])
    }
    //this method using for add new brand.
    addNewBrand() {
        const sql = 'INSERT INTO public."Brand" (brandname) VALUES ($1)';
        return queryDB(sql, [this.brandname])
    }
    //this method using for remove a brand
    deleteBrand() {
        const sql = 'DELETE FROM public."Brand" WHERE id=$1';
        return queryDB(sql, [this.id])
    }
    //this method using for update brand information.
    updateBrand() {
        const sql = 'UPDATE public."Brand" SET brandname = $1 WHERE id = $2';
        return queryDB(sql, [this.brandname, this.id])
    }
    //this method using for breadcrumb.
    getBrandById() {
        const sql = 'select * from public."Brand" WHERE id = $1 ORDER BY id ASC';
        return queryDB(sql, [this.id]);
    }
}
//export Brand
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
