const { validationResult } = require("express-validator");
const User = require("../models/user");
const HttpError = require("../models/http-error");

exports.getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not get users.", 500)
    );
  }
  res.json({
    users: users,
  });
};

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid data, please review your input data", 422)
    );
  }

  const { firstName, lastName, email, address } = req.body;

  const createdUser = new User({
    firstName,
    lastName,
    email,
    address,
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not create User.", 500)
    );
  }
  res.status(201).json({ user: createdUser });
};

exports.updateUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid data, please review your input data.", 422)
    );
  }

  const { firstName, lastName, email, address } = req.body;

  const userId = req.params.id;
  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update user.", 500)
    );
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.address = address;

  try {
    await user.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update user.", 500)
    );
  }
  res.status(200).json({ user: user });
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete user.", 500)
    );
  }

  try {
    await user.deleteOne();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete user.", 500)
    );
  }
  res.status(200).json({ message: "Deleted user." });
};
