var express = require('express');
var router = express.Router();
let User = require('../models/users');

/* GET users listing. */
router.get('/register', function (req, res, next) {
  let error = req.flash('error');
  let passError = req.flash('error');
  res.render('userRegister', { error: error, passError: passError });
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (error, user) => {
    if (error) {
      if (error.code === 11000) {
        req.flash('error', 'User already registered');
        res.redirect('/users/register');
      } else if (error.errors.password.kind === 'minlength') {
        req.flash('error', 'Password in less than 4 characters');
        res.redirect('/users/register');
      }
    } else {
      res.send('User Added');
    }
  });
});

router.get('/login', (req, res, next) => {
  let error = req.flash('error');
  let noUser = req.flash('error');
  let passwordIncorrect = req.flash('error');
  res.render('userLogin', {
    error: error,
    noUser: noUser,
    passwordIncorrect: passwordIncorrect,
  });
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
          req.flash('error', 'User not found');
          res.redirect('/users/login');
        } else {
          user.checkPassword(password, (error, result) => {
            if (error) {
              next(erorr);
            } else {
              if (!result) {
                req.flash('error', 'Incorrect Password');
                res.redirect('/users/login');
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
