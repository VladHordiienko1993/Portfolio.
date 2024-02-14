import React from 'react';
import {useDispatch} from "react-redux";
import {Field, Form, Formik} from "formik";
import styles from "./UserRegistration.module.scss";
import {createUserRequest} from "../../slices/userSlices";

const UserRegistration = () => {
  const dispath = useDispatch();

  const onSubmit = (values, formikBag)=>{
    dispath(createUserRequest(values))
    console.log(values);
    formikBag.resetForm();
  };
  return (
    <> <div  className={styles.form}>
          <Formik  onSubmit={onSubmit} initialValues={{firstName: '',lastName: '',email: '',password: '',birthday:''}}>
      <Form >
      <Field name="firstName" placeholder='firstName' />
      <Field name="lastName" placeholder='lastName' />
      <Field name="email" placeholder='email' />
      <Field name="password" placeholder='password' />
      <Field type='date' name="birthday" placeholder='birthday' />
      <Field name='submit' type='submit' value='send' />
      </Form>
    </Formik>
     </div>
    </>
   

  );
}
export default UserRegistration;
