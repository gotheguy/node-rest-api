const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const usersController = require("../controllers/users-controller");

router.get("/", usersController.getAllUsers);

router.post(
  "/",
  [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("email").not().isEmpty(),
    check("address").not().isEmpty(),
  ],
  usersController.createUser
);

router.put(
  "/:id",
  [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("email").not().isEmpty(),
    check("address").not().isEmpty(),
  ],
  usersController.updateUser
);

router.delete("/:id", usersController.deleteUser);

module.exports = router;
