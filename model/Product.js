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

    getAllProduct() {
        let sql = 'select * from public."Product"';
        return queryDB(sql, [])
            .then(result => result.rows);
    }

    getProductByCategory() {
        let sql = 'SELECT * FROM public."Product" where idBrand = $1'
        return queryDB(sql, [this.idBrand])
            .then(result => result.rows);
    }

    getProductById() {
        let sql = 'SELECT * FROM public."Product" where id = $1'
        return queryDB(sql, [this.id])
            .then(result => result.rows);
    }

    addNewProduct() {
        let sql = 'INSERT INTO public."Product"(id, idStyle, idBrand, name, price, quantity, description, image, details)' +
        'VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8);'
        return queryDB(sql, [undefined, this.idStyle, this.idBrand, this.name, this.price, this.quantity, this.description, this.image, this.details]);
    }

    updateProduct() {
        let sql = 'UPDATE public.product SET  idStyle=$1, idBrand=$2, name=$3, price=$4, quantity=$5 WHERE id=$6'
        return queryDB(sql, [this.idStyle, this.idBrand, this.name, this.price, this.quantity, this.id])
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