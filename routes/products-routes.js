const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const productsController = require("../controllers/products-controller");

router.get("/", productsController.getProducts);

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("description").isLength({ min: 10 }),
    check("price").not().isEmpty(),
  ],
  productsController.createProduct
);

router.patch(
  "/:id",
  [
    check("name").not().isEmpty(),
    check("description").isLength({ min: 10 }),
    check("price").not().isEmpty(),
  ],
  productsController.updateProduct
);

router.delete("/:id", productsController.deleteProduct);

module.exports = router;
