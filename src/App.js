import React, { useRef, useEffect } from 'react';
import { useLocation, Routes, Route, BrowserRouter } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
//https://www.npmjs.com/package/@stripe/stripe-js

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';
import { FaThemeisle } from 'react-icons/fa';

import { PrintfulClient, request } from 'printful-request';
import { Buffer } from "buffer";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};



Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const printful = new PrintfulClient(process.env.REACT_APP_PRINTFUL_KEY,{
  baseUrl: "https://api.printful.com/",
  timeout: 10000,
  mode: "no-cors",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Accept": "application/json",
    "Authorization": `Basic ${Buffer.from(`${process.env.REACT_APP_PRINTFUL_KEY}:`).toString("base64")}`
  }

});


printful.get("orders").then(({ result }) => console.log(result));


const App = () => {

 
  const childRef = useRef();
  let location = useLocation();

   useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded');
    document.title ="Sand Greetings | Say it in Sand"
    childRef.current.init();
    trackPage(page);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

 

  return (


    <ScrollReveal
      ref={childRef}
      children={() => (
        <LayoutDefault>
        
          <Home  />
        
        </LayoutDefault>
      
      )} />

  );
}

export default App;