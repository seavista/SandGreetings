import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe } from '@stripe/react-stripe-js';



let stripePromise;

const options = {
  // passing the client secret obtained from the server
 // clientSecret: `${process.env.REACT_APP_STRIPE_SECRET_KEY}`,
};

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_KEY, options);

  }

  return stripePromise;
};

//call outside render to prevent multiple calls
const stripe = getStripe();


function cleanInput(input) {
  input = input.trim();
  input = input.toLowerCase();
  input = input.replaceAll(' ', '-');
  input = input.replaceAll('/', '');
  return input;
}

let orderId = "Loading...";
let greetingImage = "";
let greetingId="";



const loadOrderDetails = async () => {


  let location = window.location.hash;
  //!hashtag routing needs this 
  location = location.replace("#", "/");

  let sessionId = new URL(window.origin + location).searchParams.get('SessionId')
  console.log(sessionId);


  //get session information from server
  const data = await fetch('https://api.stripe.com/v1/checkout/sessions/' + sessionId, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + process.env.REACT_APP_STRIPE_SECRET_KEY,
    },
  });
  const json = await data.json();
  //console.log(json);

  //this is the data passed into Stripe Checkout.  Note: metadata fields are NOT passed into Stripe Checkout
  const sessionClientReferenceId = json.client_reference_id;
  //console.log(sessionClientReferenceId);

  //split the client reference id into greeting and order id
  orderId = sessionClientReferenceId.split("|")[0];
  console.log("Order Id: "+orderId);
  greetingId = sessionClientReferenceId.split("|")[1];
  console.log("Greeting: " + greetingId);

  document.getElementById("orderNumber").innerHTML = orderId;

  //set the path to iamge from greeting name
  greetingImage = `./greetings/${cleanInput(greetingId)}.jpg`;
  
  console.log(greetingImage);
  document.getElementById("video-image").src = greetingImage;
  //assign the download URL
  var el = document.getElementById("downloadLink").href = greetingImage;
  document.getElementById("downloadLink").setAttribute("download", `SandGreetings-${orderId}.jpg`);

  
   

  //set the customer name
  let customerName = json.customer_details.name;
  console.log(json.customer_details);
  document.getElementById("customerName").innerHTML = customerName;

//write info to local storage
  localStorage.setItem("orderId", orderId);
  localStorage.setItem("greetingId", greetingId);
  localStorage.setItem("customerName", customerName);
  localStorage.setItem("greetingImage", greetingImage);
  localStorage.setItem("orderPageURL", window.location.href);
  
  //Send confirmation email only first time

 

};




const CheckoutDetails =  () => {

  let fixedDownloadUrl = "";

   loadOrderDetails();

};

export default CheckoutDetails;
