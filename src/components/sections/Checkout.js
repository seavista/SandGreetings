import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import CardIcon from "./../../assets/images/feature-tile-icon-01.svg";

import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';

export function cleanInput(input) {
  input = input.trim();
  input = input.replaceAll(' ', '-');
  input = input.replaceAll('/', '');
  return input;
}

export function checkImageURL(URL) {

  URL = cleanInput(URL);
  console.log(URL);

  if (URL === "") {
    URL = 'your-message';
  }

  URL = process.env.PUBLIC_URL + `/greetings/${URL}.jpg`;
  // URL = `/greetings/${URL}.jpg`;

  fetch(URL)
    .then((res) => {
      console.log(res);
      if (res.status == 404) {

        console.log("Image not found at " + URL);
        return false;
      } else {

        console.log(URL);
        //{require('./../../assets/images/YourMessage.jpg')}

        document.getElementById("video-image").src = URL;
      }
    })
    .catch((err) => {

      console.log("Image not found at " + URL);
      return false;
    });

}


let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

  }

  return stripePromise;
};

const Checkout = (props) => {

  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);


  const msg = props.greeting;

  const item = {
    price: "price_1LJl4OAeKJvEg73wno03jGUY",
    quantity: 1,

  };
  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/sandgreetings/#/success?SessionId={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/sandgreetings/#/cancel`,
    clientReferenceId: `${Date.now().toString()}|${props.greeting}`, //IMPORTANT: orderid|greetings this is the only passed value in Stripe Checkout
    // lineItems: [
    //   {
    //     // price: process.env.PRICE,
    //     price: {
    //       currency: item.currency,
    //       unit_amount: item.price,
    //       product_data: {
    //         name: item.name,
    //         images: [
    //           'https://picsum.photos/280/320?random=4',
    //           'https://picsum.photos/280/320?random=2',
    //         ],
    //       },
    //     },
    //     quantity: item.quantity,
    //     //description: item.description,
    //   },
    // ]
  };


  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();


    //! Attach the metadata
    stripe.metadata = { "order_id": Date.now().toString(), "greeting": props.greeting };

    //add correct image
    //PROD stripe.image = window.location.origin + `/greetings/${cleanInput(props.greeting)}.jpg`;
    stripe.image = `https://seavista.github.io/sandgreetings/greetings/${cleanInput(props.greeting)}.jpg`;
    stripe.clientReferenceId = props.greeting;

    console.log(stripe.image);
    // https://seavista.github.io/


    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);




  return (
    <div className="checkout">
      <div className="reveal-from-bottom" data-reveal-delay="600">
        <Button tag="a" color="primary" id="download-button" className="checkout-button hidden" key={checkImageURL(props.greeting)} onClick={redirectToCheckout} disabled={isLoading}>{isLoading ? "Loading..." : "Download Now"}</Button>
      </div>
    </div>
  );
};

export default Checkout;
