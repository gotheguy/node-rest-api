const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const productsRoutes = require("./routes/products-routes");
const ordersRoutes = require("./routes/orders-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/users", usersRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}`
  )
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
