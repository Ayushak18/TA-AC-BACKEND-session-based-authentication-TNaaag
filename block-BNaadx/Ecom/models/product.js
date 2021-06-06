let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productSchema = new Schema(
  {
    name: String,
    quantity: Number,
    price: Number,
    image: String,
  },
  { timestamps: true }
);

let Product = mongoose.model('product', productSchema);

module.exports = Product;
