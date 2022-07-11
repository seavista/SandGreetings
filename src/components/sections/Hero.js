import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';



import Checkout from "./Checkout";

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
    setGreetingText(event.target.value);
 };

 const [isLoading, setLoading] = useState(false);
 
  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Say it in <span className="text-invertColor">Sand!</span>
            </h1>
          </div>

          <p className="hero-input"> 
          <form onSubmit={e => { e.preventDefault(); }}>
            <input className='greeting' type="text" id="greeting" placeholder="Enter your greeting" value={greetingText}  onChange={onChangeHandler} />
                <Checkout greeting={greetingText} />
          </form>
          </p>

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
                alt="You message requires a custom sand greeting to be created."
                disabled={isLoading}
                width={896}
                height={504} />
            </a>

        
             
          </div>
          <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://youtu.be/4PcUcQ9xGy8"
            videoTag="iframe" />
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;