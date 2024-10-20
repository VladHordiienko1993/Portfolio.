import {put} from "redux-saga/effects";
import * as API from "../api/index";
import { signOutSuccess, signOutError } from "../slices/userSlices";

export function* userLogoutSaga(action){
try {
  yield API.fetchUserLogout();
  yield put(signOutSuccess());
} catch (error) {
  yield put(signOutError(error))
}
};

