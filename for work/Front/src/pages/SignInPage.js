import React, { useContext } from 'react';
import { ThemeContext } from '../context/index';
import SignInForm from '../components/SignInForm/SignInForm';



const SignInPage = () => {
  const {useSetClassName} = useContext(ThemeContext);
  const {classNamePage} = useSetClassName();
  return (
     <div className={classNamePage()}>
     <SignInForm/>
   </div>
  );
}

export default SignInPage;
