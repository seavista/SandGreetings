import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'


import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';

import DefaultImage from './../../assets/images/Your-Message.jpg';


import Checkout from "./Checkout";

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const HeroCancel = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [videoModalActive, setVideomodalactive] = useState(false);
  const [greetingText, setGreetingText] = useState("");

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );


  const imageClasses = classNames(
    'has-shadow', ' blur'
  );



  const [isLoading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  let URL = "";

  if (searchParams.get('greeting') !== null) {
    const greeting = searchParams.get('greeting');

    //process.env.PUBLIC_URL + `/greetings/${searchParams.get('greeting')}.jpg`
    URL = process.env.PUBLIC_URL + `/greetings/${searchParams.get('greeting')}.jpg`;


  }

  function imageLoaded() {
    if (URL !== "") {
      resolveAfter2Seconds().then(() => {
        document.getElementById("checkout").style.display = "block"; 
      });

    }
  }

  function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {

        document.getElementById("video-image").src = URL;
        document.getElementById("video-image").classList.remove("blur");
        resolve('resolved');

      }, 2000);
    });
  }


 

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Don't lose your <span className="text-invertColor">Sand Greeting</span>
            </h1>
          </div>

          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">

            <img
              id="video-image"
              className="has-shadow blur"
              src={DefaultImage}
              alt="You message requires a custom sand greeting to be created."
              disabled={isLoading}
              onLoad={imageLoaded()}
              width={896}
              height={504} />


            <Checkout greeting={searchParams.get('greeting')} />

          </div>

        </div>
      </div>
    </section>
  );
}

HeroCancel.propTypes = propTypes;
HeroCancel.defaultProps = defaultProps;

export default HeroCancel;