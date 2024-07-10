import React, { useContext } from 'react';
import { ThemeContext } from '../../context';
import { useSelector } from 'react-redux';
import styles from './Footer.module.scss';
import LogoWhiteDiamond from '../../logo/LogoWhiteDiamond.jfif';
import LogoDarkDiamond from '../../logo/LogoBlackDiamond.png';


const Footer = () => {
  const { useSetClassName } = useContext(ThemeContext);
  const { classNameFooter } = useSetClassName();
  const theme = useSelector((state) => state.themes.theme);
  const toggleLogoDiamond = ()=> (theme ? LogoWhiteDiamond : LogoDarkDiamond);
  const pathToGitHub = ()=>window.open('https://github.com/VladHordiienko1993/Portfolio.','_blank');
   
  
  return (
    <div className={classNameFooter()}>
      <div className={styles.wrapper}>
      <button className={styles.btnToGitHub} onClick={pathToGitHub}>
        <img className={styles.imgLogoWhiteDiamond} src={toggleLogoDiamond()}/>
        <h2 className={styles.textBtn}> https://github.com/VladHordiienko1993/Portfolio.</h2>
       
        </button> <em className={styles.textCall}>(85) 784 2101</em>
    </div></div>
  );
}

export default Footer;
