import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import styles from "./ChoiceRegistrationOption.module.scss";
import iconGoogle from '../../logo/iconGoogle.svg';
import iconPassKey from '../../logo/iconPassKey.svg';
import LogoChoice from '../../logo/LogoChoice.jpg';


const ChoiceRegistrationOption = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <h2 className={styles.textWelcome}>Welcome to Project!</h2>
       <Link to="/signUpWithEmail"> <button className={styles.btnSingUp}><img  className={styles.iconPassKey} src={iconPassKey}/>Sing Up With Email</button></Link>
        <h2 className={styles.textOr}>or</h2>
         <Formik onSubmit={()=>{}} >
        <Form>
       <button className={styles.btnGoogle} name='submit' type='submit'><img src={iconGoogle} className={styles.iconGoogle} />Continue with Google</button>
        </Form>
    </Formik>
      <h2 className={styles.textWrapperforLink}>
      Already have an account?
       <Link><em className={styles.textLink}>Log In</em></Link> 
        </h2>
      </div>
      <div className={styles.containerImg}>
      <img className={styles.LogoChoice} src={LogoChoice} />
      </div>
   

      </div>
  );
}

export default ChoiceRegistrationOption;
