import React, { useContext } from 'react';
import { ThemeContext } from '../context/index';
import SignUpForm from '../components/SignUpForm';

const SignUpWithEmailPage = () => {
  const {useSetClassName} = useContext(ThemeContext);
  const {classNamePage} = useSetClassName();
  return (
    <div className={classNamePage()}>
        <SignUpForm/>
    </div>
  );
}

export default SignUpWithEmailPage;
