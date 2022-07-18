import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Image from '../../elements/Image';

const Logo = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'brand',
    className
  );


  function onClickHandler(e) {
    window.scrollTo(0, 0, { behavior: 'auto' });
  }

  return (
    <div
      {...props}
      className={classes}
    >
      <h1 className="m-5">
       
        
          <Image
            src={require('./../../../assets/images/logo.png')}
            alt="Open"
            width={350}
            height={150} 
            onClick={onClickHandler} />
       
       
      </h1>
    </div>
  );
}

export default Logo;