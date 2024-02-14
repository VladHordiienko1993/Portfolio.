import {takeEvery} from "redux-saga/effects";
import {createUserSaga} from "./userSaga";


function* rootSaga(){
yield takeEvery('users/createUserRequest', createUserSaga);
};

export default rootSaga;