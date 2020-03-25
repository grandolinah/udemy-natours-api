/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

export const signup = async (name, email, password, passwordConfirm) => {
   try {
     const res = await axios({
       method: 'POST',
      // TODO localhost url: 'http://localhost:8000/api/v1/users/signup',
       url: '/api/v1/users/signup',
       data: {
         name,
         email,
         password,
         passwordConfirm
       }
     });

     if (res.data.status === 'success') {
       showAlert('success', 'You created account successfully.');

       window.setTimeout(() => {
         location.assign('/login');
       }, 1500);
     }
   } catch (err) {
     showAlert('error', err.response.data.message);
   }
};
