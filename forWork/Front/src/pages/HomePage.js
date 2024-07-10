import React, { useContext } from 'react';
import { ThemeContext } from '../context';
import VidioForHome from '../components/VidioForHome';


const HomePage = () => {
 
  const {useSetClassName} = useContext(ThemeContext);
  const {classNamePage} = useSetClassName();
  

  return (
    <div className={classNamePage()}>
    <VidioForHome/>
    </div>
   
  );
}

export default HomePage;
