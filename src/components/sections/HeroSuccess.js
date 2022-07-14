import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import CheckoutDetails from './CheckoutDetails';

import Button from '../elements/Button';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const HeroSuccess = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

 

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
 
  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Thank You for <span className="text-invertColor">Your Order!</span>
            </h1>
            <h3><span id="customerName"></span> - Order # <span id="orderNumber">*</span></h3>

            <Button download id="downloadLink"  tag="a" color="primary"  className="button primary">Download Image</Button> 
          
          
          </div>

   

          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
          
              <img
                id="video-image"
                className="has-shadow"
                src={require('./../../assets/images/YourMessage.jpg')}
                alt="You message requires a custom sand greeting to be created."
                width={896}
                height={504} />
          
          
           <CheckoutDetails />
             
          </div>
       
        </div>
      </div>
    </section>
  );
}

HeroSuccess.propTypes = propTypes;
HeroSuccess.defaultProps = defaultProps;

export default HeroSuccess;