const mongoose = require('mongoose');

// review / rating / created path / ref to tour/ ref to user
const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to a tour.']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user.']
  },
  price: {
    type: Number,
    require: [true, 'Booking must have a  price.']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  }
});

bookingSchema.pre(/^find/, function(next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name'
  });

  return next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
