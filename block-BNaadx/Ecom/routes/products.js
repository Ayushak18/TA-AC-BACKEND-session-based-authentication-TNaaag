let express = require('express');
let Product = require('../models/product');

let router = express.Router();

router.get('/', (req, res, next) => {
  Product.find({}, (error, products) => {
    if (error) {
      next(error);
    } else {
      res.render('products', { products: products });
    }
  });
});

router.get('/new', (req, res, next) => {
  res.render('newProduct');
});

router.post('/new', (req, res, next) => {
  Product.create(req.body, (error, product) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/products');
    }
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Product.findById(id, (error, product) => {
    if (error) {
      next(error);
    } else {
      res.render('singleProduct', { product: product });
    }
  });
});

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Product.findById(id, (error, product) => {
    if (error) {
      next(error);
    } else {
      res.render('editProduct', { product: product });
    }
  });
});

module.exports = router;
