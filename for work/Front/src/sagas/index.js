import {takeEvery} from "redux-saga/effects";
import {createUserSaga} from "./userSaga";
import { callBackGoogleSaga } from "./callBackGoogleSaga";
import {userLogoutSaga} from './userLogoutSaga'
import { themeGetSaga } from "./themeGetSaga";
import {themeSendSaga} from './themeSendSaga';
import {sessionUserSaga} from './sessionUserSaga';

function* rootSaga(){
  yield takeEvery('users/createUserRequest', createUserSaga);
  yield takeEvery('users/userGoogleRequest', callBackGoogleSaga);
  yield takeEvery('users/signOutUser', userLogoutSaga);
  yield takeEvery('themes/themeRequest', themeGetSaga);
  yield takeEvery('themes/requestSendTheme',themeSendSaga);
  yield takeEvery('users/sessionUserRequest', sessionUserSaga);
};

export default rootSaga;