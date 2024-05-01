import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch} from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { createUserRequest } from "../../slices/userSlices";
import CONSTANTS from "../../utils/constants/constants";
import styles from "./SignInForm.module.scss";

const SignInForm = () => {
  const dispatch = useDispatch();
  const push = useNavigate();
 
 
  
  const onSubmit = (values, formikBag) => {
    dispatch(createUserRequest(values));
    console.log(values);
    formikBag.resetForm();
    push('/')
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
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default SignInForm;
