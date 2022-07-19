import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Input from '../elements/Input';
import { ContactUs } from './ContactUs';
import emailjs from '@emailjs/browser';

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

const Cta = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
}) => {

  useEffect(() => {

  }, []);


  const outerClasses = classNames(
    'cta section center-content-mobile reveal-from-bottom',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'cta-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider',
    split && 'cta-split'
  );


  const theForm = useRef();

  const sendEmail = (e) => {

    e.preventDefault();

    const serviceID = 'default_service';
    const templateID = 'template_2v5kcsc';
    const emailUserName = 'Sand Greetings Request';

    e["user_name"] = "Sand Greetings Request";

    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, theForm.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container" id="cta">
        <form ref={theForm} onSubmit={sendEmail}>

          <div
            className={innerClasses}
          >
            <div className="cta-slogan">
              <h1>Wow! You're an Original</h1>

              <h4 className="m-0">
                Your message is new to our platform, it's now queued for creation. It will be ready for you to view soon.
              </h4>

              <h5 id="footerGreetingText"></h5>



              <h5>Enter your email address and we'll let you know when it is ready.</h5>

            </div>
            <div className="cta-action">
              <input type="hidden" name="user_name" value="Sand Greetings System" />
              <input type="text" name="message" />
              <Input id="user_email" type="email" label="Subscribe" labelHidden hasIcon="right" placeholder="Your best email" />
              <input type="submit" value="Send" />
              <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H1c-.6 0-1 .4-1 1s.4 1 1 1h8v5l7-6-7-6v5z" fill="#376DF9" />
              </svg>

            </div>
          </div>

        </form>
      </div>
    </section>
  );
}

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;