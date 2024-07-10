import React, { useContext } from 'react';
import { ThemeContext } from '../context';
import GoogleSuccess from '../components/GoogleSuccess';



const GoogleSuccessPage = () => {
  const {useSetClassName} = useContext(ThemeContext);
  const {classNamePage} = useSetClassName();
  

  return (
    <div className={classNamePage()}>
  <GoogleSuccess/>
    </div>
   
  );
}

export default GoogleSuccessPage;
