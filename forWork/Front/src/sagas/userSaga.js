import {put} from "redux-saga/effects";
import * as API from "../api/index";
import {createUserSuccess,createUserError} from "../slices/userSlices";

export function* createUserSaga(action){
try {
  const {data:{data: user}} = yield API.fetchCreateUser(action.payload);
  yield put(createUserSuccess(user));
} catch (error) {
  yield put(createUserError(error))
}
};

