import React, { useContext } from 'react';
import { ThemeContext } from '../../context';

const Footer = () => {
  const { useSetClassName } = useContext(ThemeContext);
  const { classNameFooter } = useSetClassName();
  return (
    <div className={classNameFooter()}>
      <h1>Hi</h1>
    </div>
  );
}

export default Footer;
