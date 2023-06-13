const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const ordersController = require("../controllers/orders-controller");

router.get("/", ordersController.getAllOrders);

router.get("/:id", ordersController.getOrdersByUserId);

router.post(
  "/",
  [
    check("referenceNumber").not().isEmpty(),
    check("total").not().isEmpty(),
    check("userId").not().isEmpty(),
    check("items").not().isEmpty(),
  ],
  ordersController.createOrder
);

router.put(
  "/:id",
  [
    check("referenceNumber").not().isEmpty(),
    check("total").not().isEmpty(),
    check("userId").not().isEmpty(),
    check("items").not().isEmpty(),
  ],
  ordersController.updateOrder
);

router.delete("/:id", ordersController.deleteOrder);

module.exports = router;
