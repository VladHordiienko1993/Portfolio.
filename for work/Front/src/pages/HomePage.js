import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../context';
import { userGoogleRequest } from '../slices/userSlices';



const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.users.users);
  
   useEffect(()=>{
    dispatch(userGoogleRequest());
  },[]);
 
  console.log(user);
  const {useSetClassName} = useContext(ThemeContext);
  const {classNamePage} = useSetClassName();
  

  return (
   <div className={classNamePage()}>
   <h2>{user === undefined? null : user.name}</h2>
   </div>
  );
}

export default HomePage;
