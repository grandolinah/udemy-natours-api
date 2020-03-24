const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  // get tours data from collection
  const tours = await Tour.find();

  // build template
  // render template using data from step 1
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // get tour data from collection + reviews and tour guides
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review, rating, user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }

  // build template
  // render template using data from step 1
  return res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login'
  });
});

exports.getSignupForm = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Create account'
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'My account'
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // find all bookings
  const bookings = await Booking.find({ user: req.user.id });
  console.log(bookings);
  // find all tours with the returned ids
  const tourIds = bookings.map(el => el.tour);
  console.log(tourIds);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', {
    title: 'My tours',
    tours
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findOneAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'My account',
    user: updatedUser
  });
});
