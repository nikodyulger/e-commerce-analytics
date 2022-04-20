var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  address: { type: String, required: true },
  birth: { type: Date, required: true },
  shoppingCart: { type: Schema.Types.ObjectId, ref: 'ShoppingCart' }
});

module.exports = mongoose.model('User', schema);

