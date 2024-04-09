import {takeEvery} from "redux-saga/effects";
import {createUserSaga} from "./userSaga";
import { callBackGoogleSaga } from "./callBackGoogleSaga";

function* rootSaga(){
  yield takeEvery('users/createUserRequest', createUserSaga);
  yield takeEvery('users/userGoogleRequest', callBackGoogleSaga);
};

export default rootSaga;