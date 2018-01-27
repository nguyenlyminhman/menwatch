const queryDB = require('../utils/DatabaseConnection');
const Product = require('../model/Product')

class OrderDetails {
    constructor(id, idOrder, idProduct, quantity) {
        this.id = id;
        this.idOrder = idOrder;
        this.idProduct = idProduct;
        this.quantity = quantity;
    }

    addNewOrderDetails() {
        const sql = 'INSERT INTO public."OrderDetails" (id, idOrder, idProduct, quantity) VALUES ($1, $2, $3, $4)';
        return queryDB(sql, ['default', this.idOrder, this.idProduct, this.quantity]);
    }
//Product"."image", "Product"."name", "Product"."price","Order"."status", "Order"."id", "Order"."orderdate", "Order"."receivedate", "Order"."total", "OrderDetails"."quantity"
    getOrderDetailsByOrderId() {
        const sql = 'SELECT "Product"."image", "Product"."name", "Product"."price","Order"."status", "Order"."id",'+
        '"Order"."orderdate", "Order"."receivedate", "Order"."total", "Order"."receiver", "Order"."orderaddress", "Order"."orderphone","OrderDetails"."quantity"'+
        'FROM public."OrderDetails", public."Order", public."Product"' +
            'WHERE "OrderDetails"."idOrder" = "Order"."id"' +
            'AND "OrderDetails"."idProduct" = "Product"."id"' +
            'AND "Order"."id"= $1';
        return queryDB(sql, [this.idOrder])
            // .then(results => results.rows)
    }
}
module.exports = OrderDetails;

// let ot = new OrderDetails(undefined, 2, undefined, undefined);
// ot.getOrderDetailsByOrderId().then(rs => {
//     rs.forEach(element => {

//         let pro = new Product(element.idProduct, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
//         pro.getProductById().then(ps => {
//             console.log(element.quantity)
//             console.log(ps.rows)
//         })
//     })
// });
