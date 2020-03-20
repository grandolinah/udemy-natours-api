/*eslint-disable*/
import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const dataUpdateForm = document.querySelector('.form-user-data');
const passwordUpdateForm = document.querySelector('.form-user-password');
const logOutBtn = document.querySelector('.nav__el--logout');

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

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    updateSettings({ name, email }, 'data');
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
