import React, { useRef, useEffect } from 'react';
import { useLocation, Routes, Route, BrowserRouter } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
//https://www.npmjs.com/package/@stripe/stripe-js



// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 

import HomeSuccess from './views/HomeSuccess';




// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};



const AppSuccess = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded');
    document.title ="Sand Greetings | Say it in Sand"
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
  
    <ScrollReveal
      ref={childRef}
      children={() => (
        <LayoutDefault><HomeSuccess /></LayoutDefault>
      
      )} />

  );
}

export default AppSuccess;