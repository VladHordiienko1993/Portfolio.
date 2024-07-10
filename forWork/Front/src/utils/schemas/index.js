import * as Yup from 'yup';

const SCHEMA_NAME = Yup.string().matches(/[a-zA-Z0-9].{1,64}$/,'2 letters minimum').required();

const SCHEMA_EMAIL = Yup.string().email('Please enter a valid email').matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required();

const SCHEMA_PASSWORD = Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z]).{5,}$/,'1 uppercase letter/1 lowercase letter/5 letters minimum').required();


export const SCHEMA_SIGN_UP = Yup.object({
  name: SCHEMA_NAME,
  email: SCHEMA_EMAIL,
  password: SCHEMA_PASSWORD,
});

