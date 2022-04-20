var User = require('./user');
var Cart = require('./shopping-cart');
var Product = require('./product');
var Order = require('./order');

Model = {};

// Model.users = [
//     {
//         _id: 100,
//         email: "niko@gmail.com",
//         password: "admin",
//         name: "Nikola",
//         surname: "Dyulgerov",
//         birth: new Date(1999, 11, 6),
//         address: "Taiga 27, Sofía",
//         shoppingCart: { items: [], qty: 0, total: 0, subtotal: 0, tax: 0 },
//         orders: [],
//     },
// ];

Model.signup = function (name, surname, address, birth, email, password) {
    return User.findOne({ email }).then(function (user) {
        if (!user) {
            var cart = new Cart({ items: [], qty: 0, total: 0, subtotal: 0, tax: 0 });
            var user = new User({ email, password, name, surname, birth, address, shoppingCart: cart });
            return cart.save().then(function () { return user.save(); })
        } else return null;
    })
}

Model.signin = function (email, password) {
    return User.findOne({ email, password });
}

Model.updateShoppingCart = function (user) {
    user.shoppingCart.qty = 0;
    user.shoppingCart.subtotal = 0;
    for (var i = 0; i < user.shoppingCart.items.length; i++) {
        user.shoppingCart.qty = user.shoppingCart.qty + user.shoppingCart.items[i].qty;
        user.shoppingCart.subtotal = user.shoppingCart.subtotal + user.shoppingCart.items[i].total;
    }
    user.shoppingCart.tax = user.shoppingCart.subtotal * 0.21;
    user.shoppingCart.total = user.shoppingCart.subtotal + user.shoppingCart.tax;
}

Model.buy = function (uid, pid) {
    return Promise.all([Model.getProductById(pid), Model.getUserByIdWithCart(uid)])
        .then(function (results) {
            var product = results[0];
            var user = results[1];
            if (user && product) {
                var item = null;
                for (var i = 0; i < user.shoppingCart.items.length; i++) {
                    if (user.shoppingCart.items[i].product == pid) {
                        item = user.shoppingCart.items[i];
                        user.shoppingCart.items.remove(item);
                    }
                }
                if (!item) { item = { product: product._id, title: product.title, description: product.description, qty: 0, unit_cost: product.price, total: 0 }; }
                item.qty++;
                item.total = item.qty * item.unit_cost;
                user.shoppingCart.items.push(item);
                Model.updateShoppingCart(user);
                return user.shoppingCart.save()
                    .then(function (result) { return result });
            } else return null;
        }).catch(function (errors) { console.error(errors); return null; })
}

Model.removeOne = function (uid, pid) {
    return User.findById(uid).populate('shoppingCart')
        .then(function (user) {
            if (user) {
                for (var i = 0; i < user.shoppingCart.items.length; i++) {
                    if (user.shoppingCart.items[i].product == pid) {
                        var item = user.shoppingCart.items[i];
                        item.qty -= 1;
                        if (user.shoppingCart.items[i].qty < 1)
                            user.shoppingCart.items.splice(i, 1);
                        else {
                            item.total = item.qty * item.unit_cost;
                        }
                    }
                }
                Model.updateShoppingCart(user);
                return user.shoppingCart.save();
            }
        });
}

Model.removeAll = function (uid, pid) {
    return User.findById(uid).populate('shoppingCart')
        .then(function (user) {
            if (user) {
                for (var i = 0; i < user.shoppingCart.items.length; i++) {
                    if (user.shoppingCart.items[i].product == pid) {
                        user.shoppingCart.items.splice(i, 1);
                    }
                }
                Model.updateShoppingCart(user);
                return user.shoppingCart.save();
            }
        })
}

Model.purchase = function (uid, purchase) {
    return User.findById(uid).populate('shoppingCart')
        .then(function (user) {
            if (user) {
                console.log("usuario", user)
                purchase.items = user.shoppingCart.items;
                purchase.subtotal = user.shoppingCart.subtotal;
                purchase.total = user.shoppingCart.total;
                purchase.tax = user.shoppingCart.tax;
                user.shoppingCart.items = [];
                user.shoppingCart.qty = 0 ;
                user.shoppingCart.total = 0;
                user.shoppingCart.subtotal = 0;
                user.shoppingCart.tax = 0;
                user.shoppingCart.save()
            }
        }).then(function () {
            const order = new Order({
                number: purchase.number,
                user: uid,
                date: purchase.date,
                name: purchase.name,
                address: purchase.address,
                card_number: purchase.card_number,
                card_holder: purchase.card_holder,
                qty: purchase.qty,
                subtotal: purchase.subtotal,
                total: purchase.total,
                tax: purchase.tax,
                items: purchase.items
            })
            return order.save();
        })
}

Model.getOrders = function (uid) {
    return Order.find({user: uid});
}

Model.getOrder = function (uid, number) {
    return Order.findOne({user: uid, number: number});
}

Model.getUserById = function (userid) {
    return User.findById(userid);
}

Model.getUserCartQty = function (userid) {
    return User.findById(userid).populate({ path: 'shoppingCart', select: 'qty' }) //.select('shoppingCart')
}

Model.getProducts = function () {
    console.log("getProducts");
    return Product.find();
}

Model.getProductById = function (pid) {
    return Product.findById(pid);
}

Model.getUserByIdWithCart = function (userid) {
    return User.findById(userid).populate('shoppingCart');
}

module.exports = Model;