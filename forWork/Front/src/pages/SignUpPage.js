import React, { useContext } from 'react';
import { ThemeContext } from '../context/index';
import ChoiceRegistrationOption from '../components/ChoiceRegistrationOption/ChoiceRegistrationOption';



const SignUpPage = () => {
  const {useSetClassName} = useContext(ThemeContext);
  const {classNamePage} = useSetClassName();
  return (
     <div className={classNamePage()}>
     <ChoiceRegistrationOption/>
   </div>
  );
}

export default SignUpPage;
