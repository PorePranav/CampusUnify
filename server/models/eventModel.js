const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  serialNumber: {
    type: Number,
    required: [true, 'A day must have a serialNumber'],
  },
  date: {
    type: Date,
    required: [true, 'A date must be specified for the event'],
  },
  description: {
    type: String,
    required: [true, 'A description must be provided for the date'],
  },
  venue: {
    type: String,
    required: [true, 'A venue must be specified for the date'],
  },
});

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An event must have a name'],
    },
    eventCharges: {
      type: Number,
      required: [true, 'An event must have charges'],
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'An event must have a description'],
    },
    days: {
      type: [daySchema],
      required: [true, 'An event must atleast have a day'],
    },
    maxCapacity: {
      type: Number,
      required: [true, 'An event must have a maximum capacity'],
    },
    coverImage: {
      type: String,
      required: [true, 'An event must have a cover image'],
      default:
        'https://firebasestorage.googleapis.com/v0/b/campusunify-73175.appspot.com/o/lee-blanchflower-1dW1vEJLlCQ-unsplash.jpg?alt=media&token=aa7bb9be-75bb-4f9f-b273-d2bf3e042ebb',
    },
    cardImage: {
      type: String,
      required: [true, 'An event must have a card image'],
      default:
        'https://i.etsystatic.com/15907303/r/il/c8acad/1940223106/il_794xN.1940223106_9tfg.jpg',
    },
    date: {
      type: Date,
      required: [true, 'An event must have a date'],
    },
    category: {
      type: String,
      required: [true, 'An event must have a category'],
      default: 'technical',
      enum: [
        'academic',
        'cultural',
        'competition',
        'technical',
        'artistic',
        'outdoor',
      ],
    },
    clubId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'An event must belong to a club'],
    },
    isAcceptingRegistrations: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

eventSchema.virtual('bookings', {
  ref: 'Bookings',
  foreignField: 'eventId',
  localField: '_id',
  options: { select: '-id' },
});

eventSchema.virtual('isFull').get(function () {
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
  this.select('-__v');
  next();
});

eventSchema.statics.getLatestEvents = async function () {
  return this.find().sort({ date: -1 }).limit(3).exec();
};

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
