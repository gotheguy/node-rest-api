const { validationResult } = require("express-validator");
const Order = require("../models/order");
const HttpError = require("../models/http-error");

exports.getOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find({});
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not get orders.", 500)
    );
  }
  res.json({
    orders: orders,
  });
};

exports.getOrdersByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let orders;
  try {
    orders = await Order.find({ userId: userId });
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not get order.", 500)
    );
  }
  res.json({
    orders: orders,
  });
};

exports.createOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid data, please review your input data", 422)
    );
  }

  const { referenceNumber, total, userId, items } = req.body;

  const createdOrder = new Order({
    referenceNumber,
    total,
    userId,
    items,
  });

  try {
    await createdOrder.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not create order.", 500)
    );
  }
  res.status(201).json({ order: createdOrder });
};

exports.updateOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid data, please review your input data.", 422)
    );
  }

  const { referenceNumber, total, userId, items } = req.body;

  const orderId = req.params.id;
  let order;

  try {
    order = await Order.findById(orderId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update order.", 500)
    );
  }

  order.referenceNumber = referenceNumber;
  order.total = total;
  order.userId = userId;
  order.items = items;

  try {
    await order.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update order.", 500)
    );
  }
  res.status(200).json({ order: order });
};

exports.deleteOrder = async (req, res, next) => {
  const orderId = req.params.id;

  let order;
  try {
    order = await Order.findById(orderId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete order.", 500)
    );
  }

  try {
    await order.deleteOne();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete order.", 500)
    );
  }
  res.status(200).json({ message: "Deleted order." });
};
