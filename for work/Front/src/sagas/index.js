import {takeEvery} from "redux-saga/effects";
import {createUserSaga} from "./userSaga";
import { callBackGoogleSaga } from "./callBackGoogleSaga";
import {userLogoutSaga} from './userLogoutSaga'

function* rootSaga(){
  yield takeEvery('users/createUserRequest', createUserSaga);
  yield takeEvery('users/userGoogleRequest', callBackGoogleSaga);
  yield takeEvery('users/signOutUser', userLogoutSaga)
};

export default rootSaga;