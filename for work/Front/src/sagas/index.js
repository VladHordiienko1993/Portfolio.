import {takeEvery} from "redux-saga/effects";
import {createUserSaga} from "./userSaga";
import { callBackGoogleSaga } from "./callBackGoogleSaga";
import {userLogoutSaga} from './userLogoutSaga'
import { themeGetSaga } from "./themeGetSaga";
import {themeSendSaga} from './themeSendSaga';


function* rootSaga(){
  yield takeEvery('users/createUserRequest', createUserSaga);
  yield takeEvery('users/userGoogleRequest', callBackGoogleSaga);
  yield takeEvery('users/signOutUser', userLogoutSaga);
  yield takeEvery('themes/themeRequest', themeGetSaga);
  yield takeEvery('themes/requestSendTheme',themeSendSaga);
};

export default rootSaga;