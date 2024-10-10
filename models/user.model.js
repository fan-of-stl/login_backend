const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const saltFactor = parseInt(process.env.SALT_WORK_FACTOR)

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  username: String,
  phonenumber: String,
  profession: String,
});


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(saltFactor);

    this.password = await bcrypt.hash(this.password, salt);

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.validatePassword = async function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password); 
  };

module.exports = mongoose.model("user", userSchema, "Users");
