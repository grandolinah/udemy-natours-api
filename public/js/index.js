/*eslint-disable*/
import '@babel/polyfill';
import { login, logout } from './login';
import { signup } from './signup';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { createReview, deleteReview, updateReview } from './review';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const dataUpdateForm = document.querySelector('.form-user-data');
const passwordUpdateForm = document.querySelector('.form-user-password');
const logOutBtn = document.querySelector('.nav__el--logout');
const bookBtn = document.querySelector('#book-tour');
const reviewBtn = document.querySelector('#review-btn');
const updateReviewBtn = document.querySelector('#update-review-btn');
const deleteReviewBtns = document.querySelectorAll('.delete-review');

if (mapBox) {
  let { locations } = mapBox.dataset;

  locations = JSON.parse(locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    signup(name, email, password, passwordConfirm);
  });
}

if (dataUpdateForm) {
  dataUpdateForm.addEventListener('submit', e => {
    e.preventDefault();

    const form = new FormData();

    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });
}

if (passwordUpdateForm) {
  passwordUpdateForm.addEventListener('submit', async e => {
    e.preventDefault();

    document.querySelector('.bnt--save-password').innerHTML =
      'SAVING PASSWORD...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.querySelector('.bnt--save-password').innerHTML = 'SAVE PASSWORD';
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    const { tourId } = e.target.dataset;

    e.target.textContent = 'Processing...';
    bookTour(tourId);
  });
}

if (reviewBtn) {
  reviewBtn.addEventListener('click', e => {
    e.preventDefault();

    const tourSlug = window.location.pathname.split('/')[2];
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    const { user } = e.target.dataset;

    createReview(tourSlug, review, rating, user);
  });
}

if (deleteReviewBtns) {
  deleteReviewBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      console.log('clicked');
      const { reviewId } = e.target.dataset;
      console.log(reviewId);

      deleteReview(reviewId);
    });
  });
}

if (updateReviewBtn) {
  updateReviewBtn.addEventListener('click', e => {
    e.preventDefault();

    const reviewText = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    console.log(e.target.dataset);
    const { user, review } = e.target.dataset;
  
    updateReview(review, reviewText, rating, user);
  })
}
