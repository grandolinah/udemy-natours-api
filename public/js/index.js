/*eslint-disable*/
import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const dataUpdateForm = document.querySelector('.form-user-data');
const passwordUpdateForm = document.querySelector('.form-user-password');
const logOutBtn = document.querySelector('.nav__el--logout');
const bookBtn = document.querySelector('#book-tour');

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
