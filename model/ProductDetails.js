const queryDB = require('../utils/DatabaseConnection');

class ProductDetails {
    constructor(idproduct, idsize) {
        this.idproduct = idproduct;
        this.idsize = idsize;
    }

    getProductSize() {
        //let sql = 'select * from public."ProductDetails" ORDER BY idproduct ASC';
        let sql = 'select * from getProductSize($1) ORDER BY size_number ASC'
        //let sql = 'select size_number from size, product_details where product_details.idsize = size.idsize' +
            //'and idproduct = $1'
        return queryDB(sql, [this.idproduct])
            .then(result => result.rows);
    }
}
module.exports = ProductDetails;
// const a = new ProductDetails(9, undefined);
// a.getProductSize().
//     then(a => console.log(a));
