const Tour = require('../models/tourModel');
const catchAsync = require('./../utils/catchAsync');

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

  // build template
  // render template using data from step 1
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});
