import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch} from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { createUserRequest } from "../../slices/userSlices";
import CONSTANTS from "../../utils/constants/constants";
import { SCHEMA_SIGN_UP } from "../../utils/schemas";
import styles from "./SignUpForm.module.scss";

const SignUpForm = () => {
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
export default SignUpForm;
