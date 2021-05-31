var express = require('express');
var router = express.Router();
let User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users');
});

router.get('/register', (req, res) => {
  res.render('registerUser');
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/users/login');
    }
  });
});

router.get('/login', (req, res) => {
  res.render('loginUser');
});

router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    console.log('No email and password is presenet');
    return res.redirect('/users/login');
  } else {
    User.findOne({ email }, (error, user) => {
      if (error) {
        next(error);
        return res.redirect('/users/login');
      } else if (!user) {
        console.log('User not found');
        return res.redirect('/users/login');
      } else if (user) {
        user.verifyPassword(password, (error, result) => {
          if (error) {
            return console.log('Error in password');
          } else if (!result) {
            console.log('Password in incorrect');
            return res.redirect('/users/login');
          } else {
            console.log('Password correct');
            res.send(result);
          }
        });
      }
    });
  }
});

module.exports = router;
