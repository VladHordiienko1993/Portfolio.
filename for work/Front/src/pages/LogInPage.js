import React, { useContext } from 'react';
import { ThemeContext } from '../context/index';
import LogInForm from '../components/LogInForm/LogInForm';



const LogInPage = () => {
  const {useSetClassName} = useContext(ThemeContext);
  const {classNamePage} = useSetClassName();
  return (
     <div className={classNamePage()}>
     <LogInForm/>
   </div>
  );
}

export default LogInPage;
