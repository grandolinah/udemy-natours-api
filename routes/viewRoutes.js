const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();

// rendering templates
router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview
);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);

router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);

router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);

router.get(
  '/tour/:slug/reviews',
  authController.protect,
  viewsController.getCreateReviewForm
);

router.get(
  '/tour/:slug/reviews/update',
  authController.protect,
  viewsController.getUpdateReviewForm
);

router.get(
  '/tour/:slug/reviews/delete',
  authController.protect,
  viewsController.getDeleteReviewForm
);

router.get('/my-reviews', authController.protect, viewsController.getMyReviews);

router.get('/my-billing', authController.protect, viewsController.getBilling);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
