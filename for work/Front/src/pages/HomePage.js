import React, { useContext } from 'react';
import { ThemeContext } from '../context';





const HomePage = () => {
  
  const {useSetClassName} = useContext(ThemeContext);
  const {classNamePage} = useSetClassName();

  return (
   <div className={classNamePage()}>
   <button>HOME</button>
   </div>
  );
}

export default HomePage;
