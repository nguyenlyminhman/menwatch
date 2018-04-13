module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.add = function (item, id, qty, pri, name) {
        var cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = { item: item, quantity: 0, price: 0, pprice:0, pname:'' };
        }

        if (cartItem.quantity != qty || cartItem.quantity == qty) {
            this.totalItems = this.totalItems - cartItem.quantity;
            this.totalPrice = this.totalPrice - (cartItem.item.rows[0].price * cartItem.quantity);
            cartItem.quantity = qty;
            cartItem.pprice = pri;
            cartItem.pname = name;
        }
        
        cartItem.price = cartItem.item.rows[0].price * cartItem.quantity;
        this.totalItems = (this.totalItems + cartItem.quantity);
        this.totalPrice = (this.totalPrice + cartItem.price);
    };
    

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
