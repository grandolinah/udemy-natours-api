/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

export const createReview = async (tourSlug, review, rating, user) => {
  let currentReviews, tourId;

  try {
    tourId = await axios({
      method: 'GET',
      // TODO localhost url: `http://localhost:8000/api/v1/tours/?slug=${tourSlug}`
      url: `/api/v1/tours/?slug=${tourSlug}`
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
  }

  tourId = tourId.data.data.data[0].id;

  try {
    currentReviews = await axios({
      method: 'GET',
      // TODO localhost url: `http://localhost:8000/api/v1/tours/${tourId}/reviews?user=${user}`
      url: `/api/v1/tours/${tourId}/reviews?user=${user}`
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
  }

  if (currentReviews.data.results === 0) {
    try {
      const res = await axios({
        method: 'POST',
        // TODO localhost url: `http://localhost:8000/api/v1/tours/${tourId}/reviews`,
        url: `/api/v1/tours/${tourId}/reviews`,
        data: {
          review,
          rating
        }
      });

      if (res.data.status === 'success') {
        showAlert('success', 'You created review successfully.');

        window.setTimeout(() => {
          location.assign('/my-reviews');
        }, 1500);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  }
};

export const deleteReview = async reviewId => {
  try {
    currentReviews = await axios({
      method: 'DELETE',
      // TODO localhost url: `http://localhost:8000/api/v1/reviews/${reviewId}`
      url: `/api/v1/reviews/${reviewId}`
    });

    if (res.data.status === 'success') {
      showAlert('success', 'You deleted review successfully.');

      window.setTimeout(() => {
        location.assign('/my-reviews');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateReview = async (review, reviewText, rating, user) => {
  const data = {
    review: reviewText,
    rating
  };

  try {
    const res = await axios({
      method: 'PATCH',
      // TODO localhost url: `http://localhost:8000/api/v1/reviews/${review}`,
      url: `/api/v1/reviews/${review}`,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', 'You updated review successfully.');

      window.setTimeout(() => {
        location.assign('/my-reviews');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
