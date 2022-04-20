var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = Schema({
    number: {type: String},
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    date: {type: Date},
    name: {type: String},
    address: {type: String},
    card_number: {type: String},
    card_holder: {type: String},
    qty: { type: Number },
    subtotal: { type: Number },
    total: { type: Number },
    tax: { type: Number },
    items: {
        type: [
          {
            title: { type: String, required: true },
            description: { type: String, required: true },
            qty: { type: Number, required: true },
            unit_cost: { type: Number, required: true },
            total: { type: Number, required: true },
            product: { type: String }
          }]
      }
});

module.exports = mongoose.model('Order', schema);