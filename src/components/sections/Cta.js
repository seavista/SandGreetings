import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Image from '../elements/Image';

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
        //show success message
        alert("Thank you for your request. We will be in touch with you shortly.");
      }, (error) => {
        console.log(error.text);
      });
  };

  const onChangeEmail = event => {

    // event.preventDefault();
    document.getElementById("sent_from").value = event.target.value;
  };


  return (
    <section
      {...props}
      className={outerClasses}
    >


      <form ref={theForm} onSubmit={sendEmail}>
        <input type="hidden" name="user_name" value="Sand Greetings System" />
        <input type="hidden" name="user_name" value="Sand Greetings System" />
        <input type="hidden" name="sent_from" id="sent_from" />


        <div className="container" id="cta">

          <div className={innerClasses}>

            <div className="cta-slogan">
              <h1>Wow! You're an Original</h1>

              <h4 id="footerGreetingText">
                <input type="text" name="message" id="message" />
              </h4>

              <h5 className="m-0">
                is new to our platform, it's now queued for creation.  Enter your email address and we'll create your FREE preview and let you know when it is ready.
              </h5>



            </div>





            <div id="formSuggestion" className="cta-action">
              <Input name="user_email" id="user_email" type="email" label="Subscribe" labelHidden hasIcon="right"  placeholder="Your best email" onChange={onChangeEmail} />
              <Button type="submit" id="btnSendSuggestion" className="btnSendSuggestion" onSubmit={sendEmail}>
                SEND
             </Button>
             
            </div>

          </div>
        </div>
      </form>

    </section>
  );
}

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;