import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import CardIcon from "./../../assets/images/feature-tile-icon-01.svg";

import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';



function checkImageURL(URL) {
//dont change default image
URL = URL.trim();
URL = URL.replaceAll(' ', '-');
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
  const item = {
    price: "price_1LJl4OAeKJvEg73wno03jGUY",
    quantity: 1
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
    
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();

    
    //! Attach the metadata
    stripe.metadata = { "order_id": Date.now().toString(), "greeting": props.greeting };


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
                 <Button tag="a" color="primary"  className="checkout-button" key={checkImageURL(props.greeting)} onClick={redirectToCheckout} disabled={isLoading}>{isLoading ? "Loading..." : "Order Now"}</Button> 
                 
               </ButtonGroup>
             </div>
    
    </div>
  );
};

export default Checkout;
