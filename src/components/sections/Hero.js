import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import { cleanInput } from '../../utils/ImageUtils';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';

import DefaultImage from './../../assets/images/Your-Message.jpg';

import Checkout from "./Checkout";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

import {  BuildMockUps, BuildProductVariants } from '../../utils/PrintfulMockUps';




//no rt clicks
window.oncontextmenu = function () {
 return false;
};



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


  const onChangeHandler = (event) => {

    //hide the download area until submit on change
    document.getElementById("checkout").style.display = "none";
    
    if (event.target.value.length > 0) {
      document.getElementById("video-image").classList.add("blur");
    } else {
      
      setGreetingText("");
      handleGreetingNotFound(event);
      //document.getElementById("video-image").classList.remove("blur");

    }
  };


  const onKeyPressHandler = event => {

    if (event.key === "Enter") {
      onSubmitClickHandler(event);
    }
  };


 


  const onSubmitClickHandler = event => {
    event.preventDefault();

    document.getElementById("footerGreetingText").value = document.getElementById("greeting").value;
    setGreetingText(document.getElementById("greeting").value);

    //for the NOT Found submission form in CTA
    document.getElementById("message").value = document.getElementById("greeting").value;

   
    //hide the not cta form
    document.getElementById("cta").classList.add("hidden");

    let currentInput = cleanInput(document.getElementById("greeting").value);

   //todo save image to localstorage for performance on re renders

    let greetingImage = process.env.PUBLIC_URL + `/greetings/${currentInput}.jpg`;

    // assign and show the image, the OnError of Image will Handle No Image Found and use the default image 
    document.getElementById("video-image").src = greetingImage;

    //show the download area
    document.getElementById("checkout").style.display = "block";

    //scroll into view
    console.log("greeting",event.target.value);
       
      
      if(document.getElementById("video-image").src != DefaultImage) {

          document.getElementById("video-image").scrollIntoView({ behavior: "auto" });
            //found greeting build mockups
            let productID = 568;
            let productMetalPrints = 588;
            let productsPostCards = 433;
            
            //cgreetings cards
            BuildMockUps(productID, currentInput, "cardImage","front");
     
             //metal prints
             BuildMockUps(productMetalPrints ,currentInput, "printsImage","default");

              //delay for 60 seconds
              // new Promise(resolve => setTimeout(resolve, 60000));
          
              //post cards
              //BuildMockUps(productsPostCards, currentInput, "postCardImage","default");


        }
     

      document.getElementById("cta").classList.add("hidden");
      document.getElementById("greeting").blur();

      

      
     

  };


 


  const onLoadEnd = event => {
  
    document.getElementById("video-image").classList.remove("blur");



  }


  function handleGreetingNotFound(e) {
   e.preventDefault();


    document.getElementById("cta").classList.remove("hidden");
    document.getElementById("cta").scrollIntoView({ behavior: "auto" });


    document.getElementById("video-image").src = DefaultImage;
    //hide the download area
    document.getElementById("checkout").style.display = "none";

   

  }

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

                <input className='greeting' maxLength={256} autoComplete="off" type="search" id="greeting" placeholder="Enter your name, greeting..." onChange={onChangeHandler} onKeyPress={onKeyPressHandler} />

                <Button tag="a" type="submit" color="primary" className="search-button" onClick={onSubmitClickHandler} disabled={isLoading}>{isLoading ? "Loading..." : "Go"}</Button>
              </form>
            </div>

            <Swiper
              id="swiperMain"
              loop={false}
              navigation={false}
              pagination={true}
              spaceBetween={10}
              slidesPerView={1}
              freeMode={false}
              
              watchSlidesProgress={true}
              modules={[Pagination, Navigation]}
              className="mySwiper has-shadow"
            >
              <h5>Swipe to Choose Scene</h5>

              <SwiperSlide>
                <img
                  id="video-image"
                  className=""
                  src={DefaultImage}
                  alt="You message requires a custom sand greeting to be created. See the bottom of the page for more information."
                  disabled={isLoading}
                  onLoad={(e) => { onLoadEnd(e); }}
                  onError={(e) => { handleGreetingNotFound(e); }}
                  width={896}
                  height={504}
                />
             
              </SwiperSlide>
              <SwiperSlide>
                <img src={require('./../../assets/images/scene-2.jpg')} />
              </SwiperSlide>
          


            </Swiper>




            

            {/* <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://youtu.be/4PcUcQ9xGy8"
            videoTag="iframe" />
          
          */}

            <Checkout greeting={greetingText} />

          </div>

        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;