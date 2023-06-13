const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  referenceNumber: { type: String, required: true },
  total: { type: Number, required: true },
  userId: { type: String, required: true },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
