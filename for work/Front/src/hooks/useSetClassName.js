import React from 'react';
import cx from "classnames";
import styles from '../common/styles/theme.module.scss'
import { useSelector } from 'react-redux';

const useSetClassName = () => {
  const theme = useSelector((state)=>state.themes.theme);
  
  return{ 
    classNamePage : ()=>{
    const className = cx(styles.darkPage,{
   [styles.lightPage]: theme === false,});
 return className;},
      classNameHeader: ()=>{
        const className = cx(styles.darkHeader,{
          [styles.lightHeader]: theme === false,});
        return className;
      },
      classNameFooter: ()=>{
        const className = cx(styles.darkFooter,{
          [styles.lightFooter]: theme === false,});
        return className;
      },
}
}
export default useSetClassName;
