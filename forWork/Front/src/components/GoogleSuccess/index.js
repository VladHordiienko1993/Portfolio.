import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { userGoogleRequest } from '../../slices/userSlices';
import styles from  './GoogleSuccess.module.scss';



const GoogleSuccess = () => {
  const dispatch = useDispatch();

//   useEffect(()=>{
//     dispatch(userGoogleRequest());
// },[]);

  return (
    <div className={styles.container}>
    <div className={styles.successContainer}>
    <h1>Registration Successful!</h1>
    <p>Welcome!</p>
    <Link to='/'><button className={styles.continueBtn}>Continue</button></Link>
</div>  
  </div>
  );
}
 
export default GoogleSuccess;
