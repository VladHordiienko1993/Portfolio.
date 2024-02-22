import React, { useContext } from 'react';
import { ThemeContext } from '../context';
import SignUpForm from '../components/SignUpForm';



const SignUpPage = () => {
  const {useSetClassName} = useContext(ThemeContext);
  const {classNamePage} = useSetClassName();
  return (
   <div className={classNamePage()}>
   <SignUpForm/>
   </div>
  );
}

export default SignUpPage;
