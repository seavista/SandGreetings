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

import ImageDefault from "./../../assets/images/Your-Message.jpg";


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
      document.getElementById("video-image").classList.remove("blur");
      setGreetingText("");


    }
  };


  const onKeyPressHandler = event => {

    if (event.key === "Enter") {
      onSubmitClickHandler(event);
    }
  };


  const onClickHandler = event => {
    event.preventDefault();
    document.getElementById("swiperMain").classList.toggle("hidden");
  };


  const { REACT_APP_DEFAULT_IMAGE } = process.env;
  const onSubmitClickHandler = event => {
    event.preventDefault();
    setGreetingText(document.getElementById("greeting").value);

    const swiper = document.getElementById("swiperMain");
    
    if (!swiper.classList.contains("hidden")) {
      swiper.classList.toggle("hidden");
    }

    //check if the image is loaded with valid image
    //if (document.getElementById("video-image").src !== "") {
    //  document.getElementById("video-image").scrollIntoView({ behavior: "smooth" });
    //  document.getElementById("video-image").classList.remove("blur");
    //}

    //handle the case where the image is but NOT loaded/found
    if (checkImage(document.getElementById("video-image").src)) {

      document.getElementById("video-image").scrollIntoView({ behavior: "smooth" });
      document.getElementById("video-image").classList.remove("blur");

      //show the download area
      document.getElementById("checkout").style.display = "block";

    } else {
      //move to orignal greeting found
      document.getElementById("cta").scrollIntoView({ behavior: "smooth" });
      document.getElementById("video-image").classList.remove("blur");
    }



    function checkImage(url) {
      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
          resolve(true);
        };
        img.onerror = function () {
          resolve(false);
        };
        img.src = url;
      });
    }

  };


function handleGreetingNotFound() {
  if (document.getElementById("greeting").value !== "") {
    document.getElementById("cta").scrollIntoView({ behavior: "auto" }); 
    //set image to default image
    setGreetingText("");
    //ERRO document.getElementById("video-image").src = ImageDefault.src;
    document.getElementById("video-image").classList.remove("blur");
}};


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

                <input className='greeting' maxLength={256} autoComplete="off" type="text" id="greeting" placeholder="Enter your greeting" onBlur={onSubmitClickHandler} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} />
                <a color="primary" className="settings-button" onClick={onClickHandler}>
                  {/* <img src={require('./../../assets/images/settings.png')} /> */}
                  Options
                </a>
                <Button tag="a" type="submit" color="primary" className="search-button" onClick={onSubmitClickHandler} disabled={isLoading}>{isLoading ? "Loading..." : "?"}</Button>
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

              <img
                id="video-image"
                className="has-shadow"
                src={process.env.REACT_APP_DEFAULT_IMAGE}
                alt="You message requires a custom sand greeting to be created. See the bottom of the page for more information."
                disabled={isLoading}
                //onLoad={() => { setLoading(false); }}
                onError={() => { handleGreetingNotFound(); }}
                width={896}
                height={504}
              />


            </div>

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