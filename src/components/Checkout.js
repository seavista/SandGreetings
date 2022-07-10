import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import CardIcon from "./../assets/images/feature-tile-icon-01.svg";

import ButtonGroup from './/elements/ButtonGroup';
import Button from './/elements/Button';

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
  const item = {
    price: "price_1LJl4OAeKJvEg73wno03jGUY",
    quantity: 1
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    //! Attach the metadata
    stripe.metadata = { "order_id": "4567", "greeting": props.greeting };

    console.log(stripe.metadata);
    debugger; // execution will pause at this line

    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);

  return (
    <div className="checkout">

            <div className="reveal-from-bottom" data-reveal-delay="600">
               <ButtonGroup>
                 <Button tag="a" color="primary"  className="checkout-button" onClick={redirectToCheckout} disabled={isLoading}>{isLoading ? "Loading..." : "Order Now"}</Button> 
               </ButtonGroup>
             </div>
    
    </div>
  );
};

export default Checkout;
