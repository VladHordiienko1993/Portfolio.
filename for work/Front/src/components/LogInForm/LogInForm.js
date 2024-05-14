import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { createUserSuccess,createUserError } from "../../slices/userSlices";
import CONSTANTS from "../../utils/constants/constants";
import * as API from "../../api/index";
import styles from "./LogInForm.module.scss";

const LogInForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state)=>state.users.error);
  const push = useNavigate();
 

  
  const onSubmit = async(values, formikBag) => {
    const {data:{data: user}} = await API.fetchLoginUser(values)
          .catch((err)=>{
            if(err && err.message){
              console.log(err.request.status)
              dispatch(createUserError(err.request.status))
            }
          })

          if(user){
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
        initialValues={CONSTANTS.INITIAL_VALUES_FORM_SIGN_IN}
      >
        {(formikProps) => {
          return (
            <Form className={styles.form}>

              <label className={styles.label}>
                <Field
                type='email'
                  name="email"
                  placeholder="Email"
                  className={styles.inputBox}
                />
                <ErrorMessage name="email" component="em" />
              </label>
              <label className={styles.label}>
                <Field
                  name="password"
                  type='password'
                  placeholder="Password"
                  className={styles.inputBox}
                />
              </label>
              <Field
                name="submit"
                type="submit"
                value="Join now"
                className={styles.btnSubmit}
              />
               {error === 400 ? <em className={styles.notValidEmail}>
               Please enter a valid email</em> : null}
               {error === 404 ? <em className={styles.notValidPassword}>
               Password is not valid</em> : null}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default LogInForm;
