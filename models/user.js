const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  street: { type: String, required: true },
});

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: addressSchema,
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
