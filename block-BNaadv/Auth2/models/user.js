let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

let userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
});

userSchema.pre('save', function (next) {
  if (this.password) {
    bcrypt.hash(this.password, 10, (error, hashedPassword) => {
      if (error) {
        return next(error);
      } else {
        this.password = hashedPassword;
        next();
      }
    });
  }
});

userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (error, result) => {
    if (error) {
      return next(error);
    } else {
      cb(error, result);
    }
  });
};

let User = mongoose.model('user', userSchema);

module.exports = User;
