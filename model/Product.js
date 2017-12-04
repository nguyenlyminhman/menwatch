const queryDB = require('../utils/DatabaseConnection');

class Product {
    constructor(idproduct, idproducer, idcategory, pro_code, pro_name, pro_price, pro_discount, pro_description, pro_new, pro_best_sale) {
        this.idproduct = idproduct;
        this.idproducer = idproducer;
        this.idcategory = idcategory;
        this.pro_code = pro_code;
        this.pro_name = pro_name;
        this.pro_price = pro_price;
        this.pro_discount = pro_discount;
        this.pro_description = pro_description;
        this.pro_new = pro_new;
        this.pro_best_sale = pro_best_sale;
    }

    getAllProduct() {
        let sql = 'select * from public."product"';
        return queryDB(sql, [])
            .then(result => result.rows);
    }

    getProductByCategory() {
        let sql = 'SELECT * FROM public."product" where idcategory = $1'
        return queryDB(sql, [this.idcategory])
            .then(result => result.rows);
    }

    getProductById() {
        let sql = 'SELECT * FROM public."product" where idproduct = $1'
        return queryDB(sql, [this.idproduct])
            .then(result => result.rows);
    }

    getBestSaleProduct() {
        let sql = 'SELECT * FROM public."product" where pro_best_sale = true'
        return queryDB(sql, [])
            .then(result => result.rows);
    }

    insertNewProduct() {
        let sql = 'INSERT INTO public."product"(cateid, proname, proprice, prodetails)VALUES ($1, $2, $3, $4);'
        return queryDB(sql, [this.cateid, this.proname, this.proprice, this.prodetails]);
    }

    updateProduct() {
        let sql = 'UPDATE public.product SET  cateid=$1, proname=$2, proprice=$3, prodetails=$4 WHERE proid=$5'
        return queryDB(sql, [this.cateid, this.proname, this.proprice, this.prodetails, this.proid])
    }
}

module.exports = Product;

//let product = new Product(30, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
// // pro.insertNewProduct()
// // .then(() => console.log('ok man'))
// // .catch(err=> console.log(err));

// product.getProductById()
// .then(s => console.log(s))
// .catch(w => console.log('not found' + w));