import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';

import Checkout from "./Checkout";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";


const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
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

  const onChangeHandler = event => {

    
    if(event.target.value.length > 0) {
      document.getElementById("video-image").classList.add("blur");
    } else{
      document.getElementById("video-image").classList.remove("blur");
      setGreetingText("");
    }

   
  };


const onKeyPressHandler = event => {
 
  if(event.key === "Enter") {
    onSubmitClickHandler(event);
  }
};



  const onClickHandler = event => {
    event.preventDefault();
    document.getElementById("swiperMain").classList.toggle("hidden");
  };




  const onSubmitClickHandler = event => {
    event.preventDefault();
     setGreetingText(document.getElementById("greeting").value);
    
     const swiper = document.getElementById("swiperMain");
     if (!swiper.classList.contains("hidden")) {
       swiper.classList.toggle("hidden");
     }

     //check if the image is loaded with valid image
     if(document.getElementById("video-image").src !== "") {
      document.getElementById("video-image").classList.remove("blur");
     }
     
     //remove blur
     document.getElementById("video-image").classList.remove("blur");

  };



  const [isLoading, setLoading] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);


  return (

    <section
      {...props}
      className={outerClasses}
    >
      <div id="firebaseui-auth-container"></div>

      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Say it in <span className="text-invertColor">Sand!</span>
            </h1>
          
       
          <div className="hero-input">
            <form onSubmit={e => { e.preventDefault(); return false; }}>
      
              <input className='greeting' autoComplete="off" type="text" id="greeting" placeholder="Enter your greeting" onChange={onChangeHandler} onKeyPress={onKeyPressHandler}  />
              <a color="primary" className="settings-button" onClick={onClickHandler}>
                  <img src={require('./../../assets/images/settings.png')} />
              </a>
              <Button tag="a" type="submit" color="primary" className="search-button" onClick={onSubmitClickHandler} disabled={isLoading}>{isLoading ? "Loading..." : "Preview"}</Button>
            </form>
          </div>

          <Swiper
            id="swiperMain"
            loop={true}
            navigation={true}
            pagination={true}
            spaceBetween={10}
            slidesPerView={1}
            freeMode={false}
            watchSlidesProgress={true}
            modules={[Pagination, Navigation]}
            className="mySwiper hidden"
          >
            <h5>Select Your Scene</h5>
            <SwiperSlide>
              <img src={require('./../../assets/images/scene-1.jpg')} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require('./../../assets/images/scene-2.jpg')} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require('./../../assets/images/scene-1.jpg')} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require('./../../assets/images/scene-2.jpg')} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require('./../../assets/images/scene-1.jpg')} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require('./../../assets/images/scene-2.jpg')} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require('./../../assets/images/scene-1.jpg')} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require('./../../assets/images/scene-2.jpg')} />
            </SwiperSlide>
            
            
          </Swiper>


          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <a
              data-video="https://youtu.be/4PcUcQ9xGy8"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <img
                id="video-image"
                className="has-shadow"
                src={require('./../../assets/images/YourMessage.jpg')}
                alt="You message requires a custom sand greeting to be created. See the bottom of the page for more information."
                disabled={isLoading}
                width={896}
                height={504} />
            </a>

          </div>

          {/* <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://youtu.be/4PcUcQ9xGy8"
            videoTag="iframe" />
          
          */}

          <Checkout greeting={greetingText}  />

          </div>

        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;