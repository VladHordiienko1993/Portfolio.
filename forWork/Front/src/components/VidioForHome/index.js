import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { sessionUserRequest } from '../../slices/userSlices';
import {UserContext} from "../../context";
import styles from './VidioForHome.module.scss';
import LogoBtn from '../../logo/btnSingUp.svg';



const VidioForHome = () => {
  const dispatch = useDispatch();
  const {useAuth} = useContext(UserContext);
  const {isAuth} = useAuth();
  
  const user =  useSelector((state)=>state.users.users);
            

   useEffect(()=>{
      dispatch(sessionUserRequest());
  },[]);

  
  return (  <div className={styles.container} >
      <div className={styles.wrapperTextHome}>
        {isAuth
          ? <div className={styles.containerforTextLogin}><p className={styles.welkomeText}>Welcome to the site {user.name}</p></div>  
          : <div className={styles.containerforTextLogin}><h2 className={styles.textOfLogin}>
            <p>User for login</p><p>email: testuserusemy@gmail.com</p>
            <p>password: testUserUseMe1</p> 
             </h2>
             <h2 className={styles.or}>
  with <span className={styles.googleLetter1}>G</span>
  <span className={styles.googleLetter2}>O</span>
  <span className={styles.googleLetter3}>O</span>
  <span className={styles.googleLetter4}>G</span>
  <span className={styles.googleLetter5}>L</span>
  <span className={styles.googleLetter6}>E</span>
</h2>




             <Link to="/signUpPage"><button className={styles.btnSignUp}><img className={styles.logoBtn} src={LogoBtn} />Sign Up</button></Link>


             </div> }
          

          <p className={styles.textOfVidio}>Watch a video about website management and don’t forget to register to try out the Chat, Movie library, or Todo List.</p>



      </div>

    <div className={styles.containerVidio}>Here is must to be vidio</div>

  </div>
  )
};
export default VidioForHome;
