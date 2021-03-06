/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

export const updateSettings = async (data, type) => {
  // TODO localhost
  // const url =
  // type === 'password'
  //   ? 'http://localhost:8000/api/v1/users/updateMyPassword'
  //   : 'http://localhost:8000/api/v1/users/updateMe';

  const url =
    type === 'password'
      ? '/api/v1/users/updateMyPassword'
      : '/api/v1/users/updateMe';

  try {
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} changed successful.`);

      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
