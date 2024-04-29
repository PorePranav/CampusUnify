const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "A date must be specified for the event"],
  },
  description: {
    type: String,
    required: [true, "A description must be provided for the date"],
  },
  venue: {
    type: String,
    required: [true, "A venue must be specified for the date"],
  },
});

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "An event must have a name"],
    },
    eventCharges: {
      type: Number,
      required: [true, "An event must have charges"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "An event must have a description"],
    },
    days: {
      type: [daySchema],
      required: [true, "An event must atleast have a day"],
    },
    maxCapacity: {
      type: Number,
      required: [true, "An event must have a maximum capacity"],
    },
    coverImage: {
      type: String,
      required: [true, "An event must have a cover image"],
      default:
        "https://eventplanning24x7.files.wordpress.com/2018/04/events.png",
    },
    cardImage: {
      type: String,
      required: [true, "An event must have a card image"],
      default:
        "https://i.etsystatic.com/15907303/r/il/c8acad/1940223106/il_794xN.1940223106_9tfg.jpg",
    },
    category: {
      type: String,
      required: [true, "An event must have a category"],
      enum: [
        "academic",
        "cultural",
        "competition",
        "technical",
        "artistic",
        "outdoor",
      ],
    },
    clubId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "An event must belong to a club"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

eventSchema.virtual("bookings", {
  ref: "Bookings",
  foreignField: "eventId",
  localField: "_id",
  options: { select: "-id" },
});

eventSchema.virtual("isFull").get(function () {
  const bookingsCount = this.bookings ? this.bookings.length : 0;
  return bookingsCount === this.maxCapacity;
});

eventSchema.options.toJSON = {
  virtuals: true,
  transform(doc, ret) {
    delete ret.bookings;
    delete ret.id;
    return ret;
  },
};

eventSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
