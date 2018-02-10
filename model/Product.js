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
    //using for admin
    static getBrandStyleProduct() {
        let sql = `SELECT d."id" as id, "idStyle", "idBrand", name, price, quantity,
         description, image, details, b."brandname" as brandname, e."stylename" as stylename
            FROM public."Product" d, public."Brand" b, public."Style" e 
            WHERE b."id" = d."idBrand" AND e."id" = d."idStyle"
            ORDER BY d."id" DESC`;
        return queryDB(sql, [])
    }
    //using for index page
    static getAllProduct() {
        let sql = 'select *  from public."Product" ORDER BY Id DESC LIMIT 20';
        return queryDB(sql, [])
        // .then(result => result.rows);
    }
    //using for index page
    static getBestSellProduct() {
        let sql = 'Select * from public."Product" where "id" in (' +
            'select "idProduct" as total_order from public."OrderDetails"' +
            'group by "idProduct" ORDER BY SUM(quantity) DESC LIMIT 3)';
        return queryDB(sql, [])
        // .then(result => result.rows);
    }
    //using for index and details page
    static getLatestProduct() {
        let sql = 'select *  from public."Product" ORDER BY Id DESC LIMIT 3';
        return queryDB(sql, [])
        // .then(result => result.rows);
    }
    //using for check product name exist
    checkExistProduct(){
        let sql = 'select *  from public."Product" WHERE name = $1';
        return queryDB(sql, [this.name])
    }

    getCountAllProduct() {
        let sql = 'select COUNT(*)  from public."Product"';
        return queryDB(sql, [])
        // .then(result => result.rows);
    }
    getProductByBrand(idBrand, limit, offset) {
        let sql = 'SELECT * FROM public."Product" where "idBrand" = $1 ORDER BY Id DESC LIMIT $2 OFFSET $3';
        return queryDB(sql, [idBrand, limit, offset])
        // .then(result => result.rows);
    }

    getCountProductByBrand(idBrand) {
        let sql = 'SELECT COUNT(*) FROM public."Product" where "idBrand" = $1';
        return queryDB(sql, [idBrand])
    }

    getProductByStyle(idStyle, limit, offset) {
        let sql = 'SELECT * FROM public."Product" where "idStyle" = $1 ORDER BY Id DESC LIMIT $2 OFFSET $3';
        return queryDB(sql, [idStyle, limit, offset])
        // .then(result => result.rows);
    }

    getCountProductByStyle(idStyle) {
        let sql = 'SELECT COUNT(*) FROM public."Product" where "idStyle" = $1'
        return queryDB(sql, [idStyle])
    }
    //using for sigle page to show details
    getProductDetailsById() {
        let sql = 'SELECT * FROM public."Product" where id = $1'
        return queryDB(sql, [this.id])
            .then(result => result.rows);
    }
    //using for add to cart
    getProductById() {
        let sql = 'SELECT * FROM public."Product" where id = $1'
        return queryDB(sql, [this.id]);
    }
    //using for search function
    getProductByKeyword(keywords, limit, offset) {
        let sql = 'SELECT * FROM public."Product" WHERE "name" ILIKE $1  ORDER BY Id DESC LIMIT $2 OFFSET $3';
        return queryDB(sql, ["%" + keywords + "%", limit, offset])
    }
    //using for pagination when search
    getCountProductByKeyword(keywords) {
        let sql = 'SELECT COUNT(*) FROM public."Product" WHERE LOWER(name) SIMILAR TO LOWER($1)';
        return queryDB(sql, ["%" + keywords + "%"])
    }
    //add new product
    insertNewProduct() {
        let sql = `INSERT INTO public."Product"(
           id, "idStyle", "idBrand", name, price, quantity, description, image, details)
            VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8)`;
        return queryDB(sql, [ this.idStyle, this.idBrand, this.name, this.price, this.quantity, this.description, this.image, this.details]);
    }
    //using for admin delete a product
    deleteProduct(){
        let sql = 'DELETE FROM public."Product" WHERE id=$1';
        return queryDB(sql,[this.id])
    }
    updateProductQuantity() {
        let sql = 'UPDATE public."Product" SET "quantity"="quantity" - $1 WHERE id = $2 RETURNING "quantity"';
        return queryDB(sql, [this.quantity, this.id])
    }

}
module.exports = Product;

let product = new Product( 18, undefined, undefined, undefined, undefined, 1000, undefined, undefined, undefined);
product.updateProductQuantity().then(sss=>{
    console.log(sss.rowCount)
})

// product.insertNewProduct()
//     .then(a => {
//         console.log(a.rowCount),
//             console.log('OK')
//     })
//     .catch(err => console.log(err));

// Product.getBrandStyleProduct()
// .then(s => console.log(s))
// .catch(w => console.log(w));