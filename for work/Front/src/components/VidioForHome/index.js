import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userGoogleRequest } from '../../slices/userSlices';
import {UserContext} from "../../context";
import styles from './VidioForHome.module.scss';


const VidioForHome = () => {
  const dispatch = useDispatch();
  const {useAuth} = useContext(UserContext);
  const {isAuth} = useAuth();

  const user = useSelector((state)=>state.users.users);
  
   useEffect(()=>{
    dispatch(userGoogleRequest());
  },[]);
 
  console.log(user);
  

  return (  <div className={styles.container} >
 {isAuth ? <h2 className={styles.textHome}>{`Welcome to the site ${user.name }`}</h2>  :
 <h2 className={styles.textHome}>Watch a video about website management and don’t forget to register to try out the Chat, Movie library or Todo List.</h2> }
  </div>
  )
};
export default VidioForHome;
