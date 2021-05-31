let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

let userSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 4 },
  age: Number,
  phone: Number,
});

userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    bcrypt.hash(this.password, 10, (error, hashedPassword) => {
      if (error) {
        next(error);
      } else {
        this.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (error, result) => {
    return cb(error, result);
  });
};

let User = mongoose.model('user', userSchema);

module.exports = User;
