import {put} from "redux-saga/effects";
import * as API from "../api/index";
import { createUserError, signOutUser } from "../slices/userSlices";
export function* userLogoutSaga(action){
try {
  yield API.fetchUserLogout(action.payload);
  yield put(signOutSuccess());
} catch (error) {
  yield put(signOutError(error))
}
};

