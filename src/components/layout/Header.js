import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from './partials/Logo';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';



const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool
}

const defaultProps = {
  navPosition: '',
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false
}

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {

  const [isActive, setIsactive] = useState(false);

 

  const nav = useRef(null);
  const hamburger = useRef(null);


// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDLeCUjiTrKpIa_8tMEO-CrgJ9Rluf32rk",
    authDomain: "sandgreetings-747fe.firebaseapp.com",
    projectId: "sandgreetings-747fe",
    storageBucket: "sandgreetings-747fe.appspot.com",
    messagingSenderId: "907947179925",
    appId: "1:907947179925:web:be98aa98ee90901d61009c",
    measurementId: "G-RTM5DJWYGG"
  };

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const analytics = getAnalytics(firebaseApp);

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(firebaseApp);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      document.getElementById('btnLogin').innerHTML = 'Sign Out';
      // ...
    } else {
      console.log('User is signed out');
      // User is signed out
      // ...
      document.getElementById('btnLogin').innerHTML = 'Sign In';



    }
  });


  useEffect(() => {
    isActive && openMenu();
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', clickOutside);
      closeMenu();
    };
  });  

  const openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    nav.current.style.maxHeight = nav.current.scrollHeight + 'px';
    setIsactive(true);
  }

  const closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  }

  const signIn = () => {
    
    closeMenu();
    const ui = new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
       // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
       // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
       // firebase.auth.GithubAuthProvider.PROVIDER_ID,
       // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
       // firebase.auth.OAuthProvider.PROVIDER_ID,
       //firebase.auth.SAMLAuthProvider.PROVIDER_ID,

      ]
    });

    
  }

  const signOut = () => {
    closeMenu();
   
  }

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  }

  const clickOutside = (e) => {
    if (!nav.current) return
    if (!isActive || nav.current.contains(e.target) || e.target === hamburger.current) return;
    closeMenu();
  }  

  const classes = classNames(
    'site-header',
    bottomOuterDivider && 'has-bottom-divider',
    className
  );



  return (

    
    <header
      {...props}
      className={classes}
    >
      <div className="container">
        
        <div className={
          classNames(
            'site-header-inner',
            bottomDivider && 'has-bottom-divider'
          )}>
          <Logo />
          {!hideNav &&
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={
                  classNames(
                    'header-nav',
                    isActive && 'is-active'
                  )}>
                <div className="header-nav-inner">
                  <ul className={
                    classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                    )}>
                    <li>
                      <Link to="" onClick={closeMenu}>How it Works</Link>
                    </li>
                  </ul>
                  {!hideSignin &&
                    <ul className="list-reset header-nav-right">
                      <li>
                       
                        <Button id="btnLogin"  className="button button-primary button-wide-mobile button-sm" onClick={auth.isActive ? signOut : signIn }>{auth.isActive ? "Sign Out" : "Sign In"}</Button>
                      </li>
                    </ul>}
                </div>
              </nav>
            </>}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
