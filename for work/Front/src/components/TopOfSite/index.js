import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./TopOfSite.module.scss";
import LogoWhiteDiamond from "../../logo/LogoWhiteDiamond.webp";
import LogoSun from "../../logo/LogoSun.jpg";

const TopOfSite = () => {
  return  <>
    <nav className={styles.navContainer}>
      <ul className={styles.ulContainer}>
        <Link to='/'> <img className={styles.logoWhiteDiamond} src={LogoWhiteDiamond}></img>Project</Link>
        <li>Todo List</li>
        <li><Link to='/userRegistration'>Registration User</Link></li>
        <li>Ches</li>
        <img className={styles.logoSun} src={LogoSun} />
      </ul>
    </nav>
   </>
  
}

export default TopOfSite;
