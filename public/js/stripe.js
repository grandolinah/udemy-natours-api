/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe('pk_test_gwAYLO0F0tRO71NdjR4tKnAy00tXhBkK1S');

export const bookTour = async tourId => {
  try {
    // get the session from the server
    const session = await axios(
      `http://localhost:8000/api/v1/bookings/checkout-session/${tourId}`
      // TODO dev/prod `/api/v1/bookings/checkout-session/${tourId}`
    );

    // console.log(session);

    // create checkout form + charge credit card
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
