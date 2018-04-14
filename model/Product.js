const queryDB = require('../utils/DatabaseConnection');

class Product {
    //contructor of Product class.
    constructor(id, idStyle, idBrand, name, price, quantity, description, image, details, status) {
        this.id = id;
        this.idStyle = idStyle;
        this.idBrand = idBrand;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.image = image;
        this.details = details;
        this.status = status;
    }
    //get product with it brand name, style name etc...Admin using this method.
    static getBrandStyleProduct() {
        let sql = `SELECT d."id" as id, "idStyle", "idBrand", name, price, quantity, status,
         description, image, details, b."brandname" as brandname, e."stylename" as stylename
            FROM public."Product" d, public."Brand" b, public."Style" e 
            WHERE b."id" = d."idBrand" AND e."id" = d."idStyle"
            ORDER BY d."id" DESC`;
        return queryDB(sql, [])
    }

    static getBrandStyleActiveProduct() {
        let sql = `SELECT d."id" as id, "idStyle", "idBrand", name, price, quantity,
         description, image, details, b."brandname" as brandname, e."stylename" as stylename
            FROM public."Product" d, public."Brand" b, public."Style" e 
            WHERE b."id" = d."idBrand" AND e."id" = d."idStyle" AND d."status" = true
            ORDER BY quantity ASC`;
        return queryDB(sql, [])
    }

    static getBrandStyleDisableProduct() {
        let sql = `SELECT d."id" as id, "idStyle", "idBrand", name, price, quantity,
         description, image, details, b."brandname" as brandname, e."stylename" as stylename
            FROM public."Product" d, public."Brand" b, public."Style" e 
            WHERE b."id" = d."idBrand" AND e."id" = d."idStyle" AND d."status" = false
            ORDER BY d."id" DESC`;
        return queryDB(sql, [])
    }

    //get all latest product. using for index page
    static getAllProduct() {
        let sql = 'select *  from public."Product" where status = true ORDER BY Id DESC LIMIT 20';
        return queryDB(sql, [])
    }
    //get Best Selling Product. This method using for index page
    static getBestSellProduct() {
        let sql = 'Select * from public."Product" where status = true AND "id" in (' +
            'select "idProduct" as total_order from public."OrderDetails"' +
            'group by "idProduct" ORDER BY SUM(quantity) DESC LIMIT 3)';
        return queryDB(sql, [])
    }
    //get latest product, but limit 3 product, this method using for index and details page
    static getLatestProduct() {
        let sql = 'select *  from public."Product" WHERE status = true ORDER BY Id DESC LIMIT 3';
        return queryDB(sql, [])
    }
    //using for check product name exist when adding new product
    checkActiveProduct() {
        let sql = 'select *  from public."Product" WHERE status = true AND "Product"."id" = $1';
        return queryDB(sql, [this.id])
    }
    //using for check product name exist when adding new product
    checkExistProduct() {
        let sql = 'select *  from public."Product" WHERE name = $1';
        return queryDB(sql, [this.name])
    }
    //count all product. using for pagination.
    getCountAllProduct() {
        let sql = 'select COUNT(*)  from public."Product" WHERE status = true';
        return queryDB(sql, [])
    }
    //get product by its brand id. using for api
    getProductByBrandApi() {
        let sql = `SELECT * FROM public."Product" where status = true AND "idBrand" = $1`;
        return queryDB(sql, [this.idBrand]).then(result=>result.rows)
    }
    //get product by its brand id. using for api
    getProductByStyleApi() {
        let sql = `SELECT * FROM public."Product" where status = true AND "idStyle" = $1`;
        return queryDB(sql, [this.idStyle]).then(result=>result.rows)
    }
    //get product by its brand id.
    getProductByBrand(idBrand, limit, offset) {
        let sql = 'SELECT * FROM public."Product" where status = true AND "idBrand" = $1 ORDER BY Id DESC LIMIT $2 OFFSET $3';
        return queryDB(sql, [idBrand, limit, offset])
    }
    //count product by its brand id.
    getCountProductByBrand(idBrand) {
        let sql = 'SELECT COUNT(*) FROM public."Product" where status = true AND "idBrand" = $1';
        return queryDB(sql, [idBrand])
    }
    //get product by its style id.
    getProductByStyle(idStyle, limit, offset) {
        let sql = 'SELECT * FROM public."Product" where status = true AND "idStyle" = $1 ORDER BY Id DESC LIMIT $2 OFFSET $3';
        return queryDB(sql, [idStyle, limit, offset])
    }
    //count product by its style id.
    getCountProductByStyle(idStyle) {
        let sql = 'SELECT COUNT(*) FROM public."Product" where status = true AND "idStyle" = $1'
        return queryDB(sql, [idStyle])
    }
    //using for sigle page to show product details
    getActiveProductDetailsById() {
        let sql = 'SELECT * FROM public."Product" where status = true AND id = $1'
        return queryDB(sql, [this.id])
            .then(result => result.rows);
    }
    //get product by its id. Using for add to cart
    getProductById() {
        let sql = 'SELECT * FROM public."Product" where status = true AND id = $1'
        return queryDB(sql, [this.id]);
    }
    //get product by its id. Using for add to admin
    getProductDetailsById() {
        let sql = 'SELECT * FROM public."Product" where id = $1'
        return queryDB(sql, [this.id]);
    }
    //this method using for search function
    getProductByKeyword(keywords, limit, offset) {
        let sql = 'SELECT * FROM public."Product" WHERE status = true AND "name" ILIKE $1  ORDER BY Id DESC LIMIT $2 OFFSET $3';
        return queryDB(sql, ["%" + keywords + "%", limit, offset])
    }
    //using for pagination when search
    getCountProductByKeyword(keywords) {
        let sql = 'SELECT COUNT(*) FROM public."Product" WHERE status = true AND LOWER(name) SIMILAR TO LOWER($1)';
        return queryDB(sql, ["%" + keywords + "%"])
    }
    //add new product to database.
    insertNewProduct() {
        let sql = `INSERT INTO public."Product"(
           id, "idStyle", "idBrand", name, price, quantity, description, image, details, status)
            VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8, true)`;
        return queryDB(sql, [this.idStyle, this.idBrand, this.name, this.price, this.quantity, this.description, this.image, this.details]);
    }
    //using for admin delete a product
    deleteProduct() {
        let sql = 'DELETE FROM public."Product" WHERE id=$1';
        return queryDB(sql, [this.id])
    }
    //Using for Staff proccess customer order.
    updateProductQuantity() {
        let sql = 'UPDATE public."Product" SET "quantity"="quantity" - $1 WHERE id = $2 RETURNING "quantity"';
        return queryDB(sql, [this.quantity, this.id])
    }
    //Using for Staff proccess customer order.
    updateProductInfo() {
        let sql = 'UPDATE public."Product" SET  "idStyle"=$1, "idBrand"=$2, "name"=$3, "price"=$4, "quantity"=$5, "description"=$6, "details"=$7, "status" =$8 WHERE "id"=$9;';
        return queryDB(sql, [this.idStyle, this.idBrand, this.name, this.price, this.quantity, this.description, this.details, this.status, this.id])
    }
     
}

module.exports = Product;
//undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined
// let product = new Product( );
// product.getProductByBrand(13).then(ss=>{
//     console.log(ss.rowCount)
// })
// product.updateProductQuantity().then(sss=>{
//     console.log(sss.rowCount)
// })

// product.insertNewProduct()
//     .then(a => {
//         console.log(a.rowCount),
//             console.log('OK')
//     })
//     .catch(err => console.log(err));

// product.getProductById()
// .then(s => console.log(s.rows[0].name))
// .catch(w => console.log(w));