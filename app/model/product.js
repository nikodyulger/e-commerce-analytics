var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = Schema({
    title: { type: String },
    category: { type: String },
    url: { type: String },
    description: { type: String },
    price: { type: Number }
});

module.exports = mongoose.model('Product', schema);