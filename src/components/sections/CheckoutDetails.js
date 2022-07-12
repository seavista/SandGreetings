import { loadStripe } from "@stripe/stripe-js";

let customer = "Loading...";
let stripePromise;

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_KEY);

  }

  return stripePromise;
};
//call outside render to prevent multiple calls
 const stripe =  getStripe();


const loadOrderDetails = async () => {

 

  

  let location = window.location.hash;
  //hashtag routing needs this 
  location = location.replace("#", "/");
  
  let sessionId = new URL(window.origin + location).searchParams.get('SessionId')
  console.log(sessionId);

  console.log(stripe);

  

  //get metadata from session
  //const metadata = session.metadata;


  return customer;

};


const StripeUser = async (customer) => {
  return customer;

}


const CheckoutDetails = () => {

  let stripe = loadOrderDetails();
  console.log(stripe);

  let user = StripeUser(stripe);


  return (

    <div className="orderdetails">
      <div className="reveal-from-bottom" data-reveal-delay="600">

        <h1>* {customer} *</h1>
      </div>

    </div>

  )
};

export default CheckoutDetails;
