import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./ChoiceRegistrationOption.module.scss";
import iconGoogle from '../../logo/iconGoogle.svg';
import iconPassKey from '../../logo/iconPassKey.svg';
import LogoChoice from '../../logo/LogoChoice.jpg';


const ChoiceRegistrationOption = () => {

const google = ()=>{
  window.open('http://localhost:3000/api/google/auth','_self');
}


  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <h2 className={styles.textWelcome}>Welcome to Project!</h2>
       <Link to="/signUpWithEmail"> <button className={styles.btnSingUp}><img  className={styles.iconPassKey} src={iconPassKey}/>Sing Up With Email</button></Link>
        <h2 className={styles.textOr}>or</h2>
         <button onClick={google} className={styles.btnGoogle}  ><img src={iconGoogle} className={styles.iconGoogle} />Continue with Google</button>
      <h2 className={styles.textWrapperforLink}>
      Already have an account?
       <Link to='/logIn'><em className={styles.textLink}>Log In</em></Link> 
        </h2>
      </div>
      <div className={styles.containerImg}>
      <img className={styles.LogoChoice} src={LogoChoice} />
      </div>
   

      </div>
  );
}

export default ChoiceRegistrationOption;
