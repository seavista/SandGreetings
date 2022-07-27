import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Button from '../elements/Button';

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'Create Awesome Gifts',
    paragraph: 'Use your Sand Greeting high quality image to create beautiful gifts that your will cherish for years to come.'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />

          <div className={splitClasses}>



            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning Fast Turn around
                </div>
                <h3 className="mt-0 mb-12">
                  Greeting Cards
                </h3>
                <p className="m-0">
                  Custom sand greeting cards make great thank you cards, announcements or personal stationery. Personalized cards allow you to send meaningful and memorable notes to your friends and family.
                </p>
                <div className='center-content mt-32'>
                  <Button tag="a" color="primary" className="checkout-button">Order Now</Button>
                </div>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/card.png')}
                  alt="Features split 01"
                  className={"has-shadow"}
                  width={528}
                  height={396} />
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                </div>
                <h3 className="mt-0 mb-12">
                  Metal Prints
                </h3>
                <p className="m-0">
                  Custom metal print wall artwork adds character to your home or office and make ideal gifts for friends and family. Transform your Sand Greeting into custom prints and personalized work of art.
                </p>
                <div className='center-content mt-32'>
                  <Button tag="a" color="primary" className="checkout-button">Order Now</Button>
                </div>

              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src="https://printful-upload.s3-accelerate.amazonaws.com/tmp/6f1f2d4fb183b45823f0b5690d60f7f9/greeting-card-4x6-front-62e1918e4030a.png"
                  alt="Features split 02"
                  className={"has-shadow"}
                  width={528}
                  height={396} />
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                </div>
                <h3 className="mt-0 mb-12">
                  And So Much More...
                </h3>
                <p className="m-0">
                  Sand Greetings are perfect way to send a memorable message to your friends and family. Use your Sand Greeting to create a beautiful gift that will be cherished for years to come.
                </p>
                <div className='center-content mt-32'>
                  <Button tag="a" color="primary" className="checkout-button">Order Now</Button>
                </div>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/Accesories.png')}
                  alt="Features split 03"
                  className={"has-shadow"}
                  width={528}
                  height={396} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;