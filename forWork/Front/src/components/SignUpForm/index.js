import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { createUserError,createUserSuccess } from "../../slices/userSlices";
import CONSTANTS from "../../utils/constants/constants";
import { SCHEMA_SIGN_UP } from "../../utils/schemas";
import * as API from "../../api/index";
import styles from "./SignUpForm.module.scss";


  const SignUpForm = () => {
  const dispatch = useDispatch();
  const push = useNavigate();
  const error = useSelector((state)=>state.users.error);
 

  const onSubmit = async(values, formikBag) => {
    const {data: {data: user}}  = await API.fetchCreateUser(values)
     .catch((err)=>{
       if(err && err.message){
           dispatch(createUserError(err.response.data.error[0].message))
       }
     })
     if(user ){
       dispatch(createUserSuccess(user))
  
       formikBag.resetForm()
       push('/')
     }
   };


  return (
    <div className={styles.container}>
      <Formik
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={CONSTANTS.INITIAL_VALUES_FORM_SIGN_UP}
        validationSchema={SCHEMA_SIGN_UP}
      >
        {(formikProps) => {
          return (
            <Form className={styles.form}>
              <label className={styles.label}>
                <Field
                  name="name"
                  placeholder="Name"
                  className={styles.inputBox}
                />
                <ErrorMessage
                  className={styles.errorMessage}
                  name="name"
                  component="em"
                />
              </label>

              <label className={styles.label}>
                <Field
                type='email'
                  name="email"
                  placeholder="Email"
                  className={styles.inputBox}
                />
                <ErrorMessage name="email" component="em"   />
              </label>
              <label className={styles.label}>
                <Field
                  name="password"
                  type='password'
                  placeholder="Password"
                  className={styles.inputBox}
                />
                <ErrorMessage name="password" component="em" />
              </label>
              <Field
                name="submit"
                type="submit"
                value="Join now"
                className={styles.btnSubmit}
              />
              {error ? <em className={styles.notValidEmail}>
User with this email already exists</em> : null}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default SignUpForm;
