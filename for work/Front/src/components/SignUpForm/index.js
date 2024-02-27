import React from 'react';
import {useDispatch} from "react-redux";
import {Field, Form, Formik} from "formik";
import {createUserRequest} from "../../slices/userSlices";
import styles from './SignUpForm.module.scss';


const SignUpForm = () => {

  const dispatch = useDispatch();

  const onSubmit = (values, formikBag)=>{
    dispatch(createUserRequest(values))
    console.log(values);
    formikBag.resetForm();
  };

  return (
     <div className={styles.container}>
          <Formik  onSubmit={onSubmit} initialValues={{firstName: '', email: '',password: ''}}>
      <Form className={styles.form} >
      <Field name="firstName" placeholder='Name' className={styles.inputBox} />
      <Field name="email" placeholder='Email' className={styles.inputBox} />
      <Field name="password" placeholder='Password' className={styles.inputBox} />
      <Field name="password" placeholder='Password' className={styles.inputBox} />
      <Field name='submit' type='submit' value='Join now' className={styles.btnSubmit} />
      </Form>
    </Formik>
     </div>
   
   

  );
}
export default SignUpForm;
