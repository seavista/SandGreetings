import { useState } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";

let customer = "Loading...";
let stripePromise;

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_KEY);

  }

  return stripePromise;
};


const loadOrderDetails = async () => {

  const stripe = await getStripe();



  const queryParams = new URLSearchParams(window.location.search);
  console.log(queryParams.get("SessionId"));


  const session = await stripe.sessions.retrieve(queryParams.get("SessionId"));
  const customer = await stripe.customers.retrieve(session.customer);

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
