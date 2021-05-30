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

router.get('/login', (req, res, next) => {
  res.render('userLogin');
});

router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    res.send('Enter email and password');
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
              req.session.userID = user.id;
              res.send('Session created');
            }
          });
        }
      }
    });
  }
});

module.exports = router;
