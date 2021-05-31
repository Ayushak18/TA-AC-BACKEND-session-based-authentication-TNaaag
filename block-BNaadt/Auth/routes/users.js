var express = require('express');
var router = express.Router();
let User = require('../models/users');

/* GET users listing. */
router.get('/register', function (req, res, next) {
  let error = req.flash('error');
  let passError = req.flash('info');
  res.render('userRegister', { error: error, passError: passError });
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (error, user) => {
    if (error) {
      if (error.code === 11000) {
        req.flash('error', 'User already registered');
        res.redirect('/users/register');
      } else if (error.kind === 'minlength') {
        req.flash('info', 'Password in less than 4 characters');
        res.redirect('/users/register');
      }
    } else {
      res.send('User Added');
    }
  });
});

router.get('/login', (req, res, next) => {
  let error = req.flash('error')[0];
  res.render('userLogin', { error: error });
});

router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'Enter email and password');
    res.redirect('/users/login');
  } else {
    User.findOne({ email }, (error, user) => {
      if (error) {
        next(error);
      } else {
        if (!user) {
          res.send('Enter correct Email');
        } else {
          user.checkPassword(password, (error, result) => {
            if (error) {
              next(erorr);
            } else {
              if (!result) {
                res.send('Password is not correct');
              } else {
                req.session.userID = user.id;
                res.send('Session created');
              }
            }
          });
        }
      }
    });
  }
});

module.exports = router;
