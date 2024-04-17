const mongoose = require("mongoose");
const Event = require("./eventModel");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A user ID is required for the cart"],
  },
  eventIds: {
    type: [mongoose.Schema.ObjectId],
    ref: "Event",
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
});

cartSchema.pre("save", async function (next) {
  const events = await Event.find({ _id: { $in: this.eventIds } });
  let totalAmount = 0;

  events.forEach((event) => {
    totalAmount += event.eventCharges;
  });

  this.totalAmount = totalAmount;

  next();
});

cartSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
