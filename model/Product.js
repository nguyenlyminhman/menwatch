const queryDB = require('../utils/DatabaseConnection');

class Product {
    constructor(id, idStyle, idBrand, name, price, quantity, description, image, details) {
        this.id = id;
        this.idStyle = idStyle;
        this.idBrand = idBrand;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.image = image;
        this.details = details;
    }

    static getAllProduct() {
        let sql = 'select *  from public."Product" ORDER BY Id DESC';
        return queryDB(sql, [])
            .then(result => result.rows);
    }

    getProductByBrand() {
        let sql = 'SELECT * FROM public."Product" where "idBrand" = $1 ORDER BY Id DESC'
        return queryDB(sql, [this.idBrand])
            .then(result => result.rows);
    }

    getProductByStyle() {
        let sql = 'SELECT * FROM public."Product" where "idStyle" = $1 ORDER BY Id DESC'
        return queryDB(sql, [this.idStyle])
            .then(result => result.rows);
    }

    getProductById() {
        let sql = 'SELECT * FROM public."Product" where id = $1'
        return queryDB(sql, [this.id]);
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

// let product = new Product(undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined);
// pro.insertNewProduct()
// .then(() => console.log('ok man'))
// .catch(err=> console.log(err));

// product.getProductByBrand()
// .then(s => console.log(s))
// .catch(w => console.log('' + w));