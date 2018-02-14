const queryDB = require('../utils/DatabaseConnection');
const Product = require('../model/Product')

class OrderDetails {
    //constructor of OrderDetails class.
    constructor(id, idOrder, idProduct, quantity) {
        this.id = id;
        this.idOrder = idOrder;
        this.idProduct = idProduct;
        this.quantity = quantity;
    }
    //add new order details to db.
    addNewOrderDetails() {
        const sql = 'INSERT INTO public."OrderDetails" ("idOrder", "idProduct", quantity) VALUES ($1, $2, $3)';
        return queryDB(sql, [this.idOrder, this.idProduct, this.quantity]);
    }
    //get order details by order id.
    getOrderDetailsByOrderId() {
        const sql = `Select "Product"."id" as idproduct, "Product"."image", "Product"."name", "Product"."price",
		"Order"."status", "Order"."id","Order"."orderdate", 
        "Order"."receivedate", "Order"."total", "Order"."receiver", 
        "Order"."orderaddress", "Order"."orderphone", "OrderDetails"."quantity",
        "Customer"."fistname","Customer"."lastname","Customer"."phone", "Customer"."address"
        FROM public."OrderDetails", public."Order", public."Product", public."Customer"
        WHERE "OrderDetails"."idOrder" = "Order"."id" 
        AND "Customer"."id" = "Order"."idCustomer"
        AND "OrderDetails"."idProduct" = "Product"."id"
        AND "Order"."id"= $1`;
        return queryDB(sql, [this.idOrder])
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
