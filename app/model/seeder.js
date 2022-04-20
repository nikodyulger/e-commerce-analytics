var mongoose = require('mongoose');
var User = require('./user');
var Cart = require('./shopping-cart');
var Product = require('./product');
var Order = require('./order');

var uri = 'mongodb://localhost/petshop';
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('connecting', function () { console.log('Connecting to ', uri); });
db.on('connected', function () { console.log('Connected to ', uri); });
db.on('disconnecting', function () { console.log('Disconnecting from ', uri); });
db.on('disconnected', function () { console.log('Disconnected from ', uri); });
db.on('error', function (err) { console.error('Error ', err.message); });

var cart = new Cart({ items: [], qty: 0, total: 0, subtotal: 0, tax: 0 });
var user = new User({ email: 'niko@gmail.com', password: 'admin', name: 'Nikola', surname: 'Dyulgerov', birth: '1999-12-06', address: 'Tayga 27, Sofia', shoppingCart: cart});
var products = [
  {
    title: "Turtle Aquarium",
    category: "Reptiles",
    url: "static/turtleaquarium.jpg",
    description:
      "Wide turtle hatch, designed to keep your pet in a space to move freely.",
    price: 35,
  },
  {
    title: "Bird Cage",
    category: "Birds",
    url: "static/birdcage.jpg",
    description: "Perfect birdhouse for your home in white.",
    price: 30,
  },
  {
    title: "Dog Bed",
    category: "Dogs",
    url: "static/dogbed.jpg",
    description:
      "Perfect dog mattress to guarantee the rest of the pet. There are several sizes available.",
    price: 15,
  },
  {
    title: "Dog Toy",
    category: "Dogs",
    url: "static/dogtoy.jpg",
    description:
      "Puppy toy. Multicolor for your entertainment.",
    price: 7,
  },
  {
    title: "Cat House",
    category: "Cats",
    url: "static/cathouse.jpg",
    description:
      "Cat house with a beautiful design that guarantees the rest of your pet.",
    price: 56,
  },
  {
    title: "Cat Scratcher",
    category: "Cats",
    url: "static/catscratcher.jpg",
    description:
      "Sturdy scratcher with toy, soft and fun.",
    price: 18,
  },
  {
    title: "Hamster Cage",
    category: "Rodents",
    url: "static/hamstercage.jpg",
    description:
      "Comfortable hamster cage so that it can grow up healthy and strong.",
    price: 16,
  },
  {
    title: "Fish Aquarium",
    category: "Fishes",
    url: "static/fishaquarium.jpg",
    description:
      "Perfect aquarium for any corner of your house.",
    price: 23,
  },
];

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function () { return Cart.deleteMany() })
  .then(function () { return User.deleteMany() })
  .then(function () { return Product.deleteMany() })
  .then(function() { return Order.deleteMany()})
  .then(function () { return cart.save() })
  .then(function () { return user.save() })
  .then(function () { return Product.insertMany(products) })
  .then(function () { return mongoose.disconnect(); })
  .catch(function (err) { console.error('Error ', err.message); })