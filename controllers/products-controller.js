const { validationResult } = require("express-validator");
const Product = require("../models/product");
const HttpError = require("../models/http-error");

exports.getAllProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find({});
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not get products.", 500)
    );
  }
  res.json({
    products: products,
  });
};

exports.createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid data, please review your input data", 422)
    );
  }

  const { name, description, price } = req.body;

  const createdProduct = new Product({
    name,
    description,
    price,
  });

  try {
    await createdProduct.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not create product.", 500)
    );
  }
  res.status(201).json({ product: createdProduct });
};

exports.updateProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid data, please review your input data.", 422)
    );
  }

  const { name, description, price } = req.body;

  const productId = req.params.id;
  let product;

  try {
    product = await Product.findById(productId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update product.", 500)
    );
  }

  product.name = name;
  product.description = description;
  product.price = price;

  try {
    await product.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update product.", 500)
    );
  }
  res.status(200).json({ product: product });
};

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete product.", 500)
    );
  }

  try {
    await product.deleteOne();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete product.", 500)
    );
  }
  res.status(200).json({ message: "Deleted product." });
};
