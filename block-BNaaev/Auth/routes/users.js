var express = require('express');
var router = express.Router();
let User = require('../models/users');

/* GET users listing. */
router.get('/register', function (req, res, next) {
  res.render('userRegister');
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.send('User Added');
    }
  });
});

module.exports = router;
