import React, { useContext } from "react";
import { ThemeContext } from "../../context/index";
import styles from './Spinner.module.scss';


const Spinner = () => {
  const { useSetClassName } = useContext(ThemeContext);
  
  // Получение класса темы для фона
  const themeClass = useSetClassName();

  return (
    <div className={`${styles.spinnerContainer} ${themeClass}`}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
