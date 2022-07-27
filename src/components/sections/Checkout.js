import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { cleanInput } from '../../utils/ImageUtils';

import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';

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
    price: "price_1LLxsSAeKJvEg73w3lI9I3y9",
    quantity: 1,
 
  };
  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/sandgreetings/#/success?SessionId={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/sandgreetings/#/cancel?greeting=${cleanInput(props.greeting)}`,
    clientReferenceId: `${Date.now().toString()}|${props.greeting}`, //IMPORTANT: orderid|greetings this is the only passed value in Stripe Checkout
   
    //imageUrl: "https://stripe.com/img/documentation/checkout/marketplace.png",
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

    <div id="checkout" className="hidden">
      <div className="benefits">
        <h3>Print Quality Instant Download</h3>

        <Button tag="a" color="secondary" id="download-button" className="checkout-button hidden"  onClick={redirectToCheckout} disabled={isLoading}>{isLoading ? "Loading..." : "Order Now"}</Button>
        <div className="checkout-benefit-group">
          <ul>
            <li>Instant Download</li>
            <li>Print Quality Image</li>
            <li>Create Cool Gifts</li>
            <li>No Sign Up Required</li>
          
            
          </ul>
        </div>

      
        <h3>$7.95 USD</h3>
        <h5>2100 x 1500, 300dpi Resolution</h5>



      </div>
    </div>
  );
};

export default Checkout;
