// Import model
var model = require('./model/model');

// Import express module
var express = require('express');

// Import path module
var path = require('path');

// Import logger module
var logger = require('morgan');

// Import cookie module
var cookieParser = require('cookie-parser');
const { signedCookie } = require('cookie-parser');

// Import mongoose and setting the database
var mongoose = require('mongoose');

var uri = 'mongodb://localhost/petshop';
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('connecting', function () { console.log('Connecting to ', uri); });
db.on('connected', function () { console.log('Connected to ', uri); });
db.on('disconnecting', function () { console.log('Disconnecting from ', uri); });
db.on('disconnected', function () { console.log('Disconnected from ', uri); });
db.on('error', function (err) { console.error('Error ', err.message); });
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

// Instantiate the express middleware
var app = express();

// Middleware for converting plain text to JSON objects
app.use(express.json());

// Support for nested JSON object (for more than 2 levels!)
app.use(express.urlencoded({ extended: true }));

// Support cookie parsing -> store the user with cookies (keep a session!)
app.use(cookieParser());

// Load logger module
app.use(logger('dev'));

//Set public folder to publish static content
app.use(express.static(path.join(__dirname, 'public')));

// HTTP GET /api/products -> Producer 
app.get('/api/products', function (req, res, next) {
    return model.getProducts()
        .then(function(products) {
            if (products) {
                res.json(products);
            } else return res.status(401).send({ message: 'No products available!' });
        })
        .catch(function(error){ console.error(error)})
});

app.post('/api/users/signin', function (req, res, next) {
    return model.signin(req.body.email, req.body.password)
        .then(function (user) {
            if (user) {
                res.cookie('userid', user._id);
                return res.json(user);
            }
            else return res.status(401).send({ message: 'Invalid email or password' });
        })
        .catch(function(error){ console.error(error)})
});

app.post('/api/users/signup', function (req, res, next) {
    return model.signup(req.body.name, req.body.surname, req.body.address, req.body.birth, req.body.email, req.body.password)
        .then(function (user) {
            if (user) return res.json(user);
            else return res.status(401).send({ message: 'Invalid email' });
        })
        .catch(function(error){ console.error(error)})
});

// HTTP GET /api/users/profile
app.get('/api/users/profile', function (req, res, next) {
    const uid = req.cookies.userid;
    return Model.getUserById(uid)
        .then(function(user) {
            if (user) {
                return res.json(user);
            }
            else res.status(401).send({ message: 'User is not signed in or does not exist' });
        })
        .catch(function(error){ console.error(error)})
});

app.get('/api/cart/qty', function (req, res, next) {
    var userid = req.cookies.userid;
    if (!userid) return res.status(401).send({ message: 'User has not signed in' });
    return model.getUserCartQty(userid)
      .then(function (userCartQty) {
        if (userCartQty) return res.json(userCartQty);
        else return res.status(500).send({ message: 'Cannot retrieve user cart quantity' });
      })
      .catch(function(error){ console.error(error)})
  });

app.post('/api/cart/items/product/:id', function (req, res, next) {
    var pid = req.params.id;
    var uid = req.cookies.userid;
    return model.buy(uid, pid)
      .then(function (cart) {
        if (cart) return res.json(cart);
        else return res.status(401).send({ message: 'User or Product not found' });
      })
      .catch(function(error){ console.error(error)})
  });

app.get('/api/cart', function (req, res, next) {
    var uid = req.cookies.userid;
    return model.getUserByIdWithCart(uid)
        .then(function(user) {
            if (user) return res.json(user.shoppingCart);
            else return res.status(401).send({ message: 'User shopping cart not found' });
        })
        .catch(function(error){ console.error(error)})
});

app.delete('/api/cart/items/product/:id/one', function (req, res, next) {
    var pid = req.params.id;
    var uid = req.cookies.userid;
    return model.removeOne(uid, pid)
        .then(function(cart) {
            if (cart) { return res.json(cart); }
            else return res.status(401).send({ message: 'User or Product not found' });
        })
        .catch(function(error){ console.error(error)})
});

app.delete('/api/cart/items/product/:id/all', function (req, res, next) {
    var pid = req.params.id;
    var uid = req.cookies.userid;
    console.log("request DELETE all")
    return model.removeAll(uid, pid)
        .then(function(cart) {
            if (cart) { return res.json(cart); }
            else return res.status(401).send({ message: 'User or Product not found' });
        })
        .catch(function(error){ console.error(error)})
});

app.get('/api/orders', function (req, res, next) {
    var uid = req.cookies.userid;
    return model.getOrders(uid)
        .then(function(orders) {
            if (orders) { return res.json(orders) }
            else return res.status(401).send({ message: 'No orders yet for this user' });
        })
});

app.post('/api/orders', function (req, res, next) {
    var uid = req.cookies.userid;
    return model.purchase(uid, req.body.purchase)
        .then(function(order) {
            if (order) { console.log("Order", order); return res.json(order)}
            else return res.status(401).send({ message: 'Error while creating new order' });
        })
        .catch(function(error){ console.error(error)})
});

app.get('/api/orders/id/:oid', function (req, res, next) {
    var oid = req.params.oid;
    var uid = req.cookies.userid;
    return model.getOrder(uid, oid)
        .then(function(order) {
            if (order) { return res.json(order) }
            else return res.status(401).send({ message: 'Order not found' });
        })
        .catch(function(error){ console.error(error)})
});

//Redirect request ot index.html file
app.get(/\/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
// Adds the / path to the application
app.get('/', function (req, res) {
    res.send();
});

// Listen to port 3000
app.listen(3000, function () {
    console.log('PetShop WebApp listening on port 3000!');
});