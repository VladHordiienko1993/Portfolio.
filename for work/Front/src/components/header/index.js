import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../../context";
import { toggleTheme } from "../../slices/themeSwitchSlices";
import styles from "./Header.module.scss";
import LogoWhiteDiamond from "../../logo/LogoWhiteDiamond.jfif";
import LogoDarkDiamond from "../../logo/LogoBlackDiamond.png";
import LogoSun from "../../logo/LogoSun.svg";
import LogoMoon from "../../logo/LogoMoon.svg";
import LogoBtn from '../../logo/btnSingUp.svg';

const Header = () => {
  const { useSetClassName } = useContext(ThemeContext);
  const { classNameHeader } = useSetClassName();
  const theme = useSelector((state) => state.themes.theme);
  const dispatch = useDispatch();
  const toggleLogo = () => (theme ? LogoSun : LogoMoon);
  const toggleLogoDiamond = ()=> (theme ? LogoWhiteDiamond : LogoDarkDiamond);
  const location = useLocation();
  

  return (
    <>
      <div className={classNameHeader()}>
        <div className={styles.containerDiamond}>
  <Link className={styles.linkDiamond}  to="/"><img className={styles.logoDiamond} src={toggleLogoDiamond()}></img>
             <h2 className={`${styles.textDiamond} ${styles.generalHover}`}>Project</h2> 
            </Link>
        </div>
        <nav className={styles.containerNav}>
          {location.pathname === '/signUpWithEmail' ? '' :  <ul className={styles.containerUl}>
            <Link><li className={`${styles.linkNav} ${styles.generalHover}`}>Chat</li></Link>
            <Link><li className={`${styles.linkNav} ${styles.generalHover}`}>Movie Library</li></Link>
            <Link><li className={`${styles.linkNav} ${styles.generalHover}`}>Todo List</li></Link>

          </ul>}
         
        </nav>

          <div className={styles.containerLogIn}>
              <Link><h2 className={`${styles.textLogIn} ${styles.generalHover}`}>Log in</h2></Link> 
            <Link to="/signUpPage"><button className={styles.btnSignUp}><img className={styles.logoBtn} src={LogoBtn} />Sign Up</button></Link>
            <img
              onClick={() => dispatch(toggleTheme())}
              className={styles.logoSunMoon}
              src={toggleLogo()}
            />
           
          </div>
        
      </div>
    </>
  );
};

export default Header;


{/* <button className={styles.btnSignUp}><Link className={styles.linkBtnSingUp} to="/signUpPage"><img className={styles.logoBtn} src={LogoBtn} />Sign Up</Link></button>
<img
  onClick={() => dispatch(toggleTheme())}
  className={styles.logoSun_Moon}
  src={toggleLogo()}
/> */}