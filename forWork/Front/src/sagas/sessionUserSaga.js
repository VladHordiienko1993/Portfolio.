import {put} from "redux-saga/effects";
import * as API from "../api/index";
import {sessionSuccess,sessionError} from "../slices/userSlices";

export function* sessionUserSaga(){
try {
  const {data:{data: user}} = yield API.fetchCheckSessionUser();
  yield put(sessionSuccess(user));
} catch (error) {
  yield put(sessionError(error))
}
};

