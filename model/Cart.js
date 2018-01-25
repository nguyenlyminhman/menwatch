module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.add = function (item, id, qty) {
        var cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = { item: item, quantity: 0, price: 0 };
        }

        if (cartItem.quantity != qty || cartItem.quantity == qty) {
            this.totalItems = this.totalItems - cartItem.quantity;
            this.totalPrice = this.totalPrice - (cartItem.item.rows[0].price * cartItem.quantity);
            cartItem.quantity = qty;
        }
        // // cartItem.name = cartItem.item.rows[0].name;
        // // cartItem.image = cartItem.item.rows[0].image[Object.keys(cartItem.item.rows[0].image)[0]];
        cartItem.price = cartItem.item.rows[0].price * cartItem.quantity;
        this.totalItems = (this.totalItems + cartItem.quantity);
        this.totalPrice = (this.totalPrice + cartItem.price);
    };


    // this.add = function(item, id) {
    //     var cartItem = this.items[id];
    //     if (!cartItem) {
    //         cartItem = this.items[id] = {item: item, quantity: 0, price: 0};
    //     }
    //     cartItem.quantity++;
    //     // cartItem.name = cartItem.item.rows[0].name;
    //     // cartItem.image = cartItem.item.rows[0].image[Object.keys(cartItem.item.rows[0].image)[0]];
    //     cartItem.price = cartItem.item.rows[0].price * cartItem.quantity;
    //     this.totalItems++;
    //     this.totalPrice += cartItem.item.rows[0].price;
    // };

    this.update = function (item, id, qty) {
        var cartItem = this.items[id];
        var newTotalItems = 0;
        var newTotalPrice = 0;
        if (cartItem.quantity != qty) {
            cartItem.quantity = qty;
        }
        cartItem.price = cartItem.item.rows[0].price * cartItem.quantity;
        var newTotalItems = cartItem.quantity + newTotalItems;
        var newTotalPrice = cartItem.price + newTotalPrice;


        this.totalItems = (this.totalItems + cartItem.quantity);
        this.totalPrice = (this.totalPrice + cartItem.price);
    };
    // this.reduceOneItem = function(id) {
    //             this.items[id].quantity--;
    //             this.items[id].price -= this.items[id].item.rows[0].price;
    //             this.totalItems--;
    //             this.totalPrice -= this.items[id].item.rows[0].price;
    //             if (this.items[id].quantity <= 0) {
    //                 delete this.items[id];
    //             }
    //         };

    this.removeItem = function (id) {
        this.totalItems -= this.items[id].quantity;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };


    this.getItems = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};
// //cart moi
// module.exports = function Cart(oldCart) {
//     this.items = oldCart.items || {};
//     this.totalQty = oldCart.totalQty || 0;
//     this.totalPrice = oldCart.totalPrice || 0;

//     this.add = function(item, id) {
//         var storedItem = this.items[id];
//         if (!storedItem) {
//             storedItem = this.items[id] = {item: item, qty: 0, price: 0};
//         }
//         storedItem.qty++;
//         storedItem.price = storedItem.item.price * storedItem.qty;
//         console.log(storedItem.price);
//         this.totalQty++;
//         this.totalPrice += storedItem.item.price;
//     };

//     this.reduceByOne = function(id) {
//         this.items[id].qty--;
//         this.items[id].price -= this.items[id].item.price;
//         this.totalQty--;
//         this.totalPrice -= this.items[id].item.price;

//         if (this.items[id].qty <= 0) {
//             delete this.items[id];
//         }
//     };

//     this.removeItem = function(id) {
//         this.totalQty -= this.items[id].qty;
//         this.totalPrice -= this.items[id].price;
//         delete this.items[id];
//     };

//     this.generateArray = function() {
//         var arr = [];
//         for (var id in this.items) {
//             arr.push(this.items[id]);
//         }
//         return arr;
//     };
// };