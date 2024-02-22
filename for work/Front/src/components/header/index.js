import React, { useContext } from "react";
import { Link } from "react-router-dom";
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

  return (
    <>
      <div className={classNameHeader()}>
        <nav className={styles.navContainer}>
          <ul className={styles.ulContainer}>
            <Link  to="/"><img className={styles.logoWhiteDiamond} src={toggleLogoDiamond()}></img>
              Project
            </Link>
            <li>Todo List</li>
            <li>Log in</li>
            <button className={styles.btnSignUp}><Link className={styles.linkBtnSingUp} to="/signUpPage"><img className={styles.logoBtn} src={LogoBtn} />Sign Up</Link></button>
            <img
              onClick={() => dispatch(toggleTheme())}
              className={styles.logoSun_Moon}
              src={toggleLogo()}
            />
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
