const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const UnauthorizedError = require("../errors/UnauthorizedError");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Username",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "About",
  },
  avatar: {
    type: String,
    validate: {
      validator(text) {
        return validator.isURL(text);
      },
      message: "Invalid Avatar URL",
    },
    default:
      "https://i.pinimg.com/564x/e0/3a/f4/e03af47cdc6ed351b2258034dbf39347.jpg",
  },
  email: {
    type: String,
    minlength: 2,
    required: true,
    unique: true,
    validate: {
      validator(text) {
        return validator.isEmail(text);
      },
      message: "Invalid Email Format",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
  next
) {
  return this.findOne({ email })
    .select("+password")
    .orFail(() => {
      throw new UnauthorizedError("401 Invalid Email or Password 1");
    })
    .then((user) =>
      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError("401 Invalid Email or Password 2");
          }

          return user;
        })
        .catch(next)
    );
};

exports.User = mongoose.model("user", userSchema);
