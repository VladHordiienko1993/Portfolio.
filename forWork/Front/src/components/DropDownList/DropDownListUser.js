import React, {  useRef, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cx from "classnames";
import {signOutUser} from '../../slices/userSlices';
import {useClickOutside} from '../../hooks/index';
import LogoUser from '../../logo/LogoUser.png';
import styles from "./DropDownListUser.module.scss";



const DropDownListUser = (props) => {
  const user = useSelector((state)=>state.users.users);
  const [drop, setDrop] = useState(false);
  const stylesMenu = cx(styles.menu, {
    [styles.dropDown]: drop === true,
  });
 const dispath = useDispatch();
  const callBack = () => {
    
    setTimeout(() => setDrop(false), 5);
  };
  const clickDrop = () => {
    setDrop(!drop);
  };
  const refMenu = useRef(null);
  const push = useNavigate();
  const handlerSignOut = ()=>{
    dispath(signOutUser())
    push('/');
  };
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
            <li onClick={handlerSignOut} className={styles.MenuItemText}>Sign Out</li>
        </ul>
      </nav>
    </>
  );
};

export default DropDownListUser;