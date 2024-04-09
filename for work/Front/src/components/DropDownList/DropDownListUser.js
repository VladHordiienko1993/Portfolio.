import React, {  useRef, useState } from "react";
import {  useSelector } from "react-redux";
import cx from "classnames";
import styles from "./DropDownListUser.module.scss";
import {useClickOutside} from '../../hooks/index';
import LogoUser from '../../logo/LogoUser.png';

const DropDownListUser = (props) => {
  const user = useSelector((state)=>state.users.users);
  const [drop, setDrop] = useState(false);
  const stylesMenu = cx(styles.menu, {
    [styles.dropDown]: drop === true,
  });
 
  const callBack = () => {
    setTimeout(() => setDrop(false), 5);
  };
  const clickDrop = () => {
    setDrop(!drop);
  };
  const refMenu = useRef(null);

  useClickOutside(refMenu, callBack);

  return (
    <>
      <div className={styles.wrapperClickDrop}>
       
        <img  onClick={clickDrop}
         className={styles.btnMenu} src={user.imgPath === null ? LogoUser : user.imgPath}/>
          
      </div>
      <nav ref={refMenu} className={stylesMenu}>
        <ul className={styles.menuList}>
            <li className={styles.MenuItemText}>Change profile picture</li>
            <li className={styles.MenuItemText}>Remove Acount</li>
            <li className={styles.MenuItemText}>Sign Out</li>
        </ul>
      </nav>
    </>
  );
};

export default DropDownListUser;