// import {put} from "redux-saga/effects";
import * as API from "../api/index";
// import { createUserError } from "../slices/userSlices";
export function* userLogoutSaga(action){
try {
  yield API.fetchUserLogout(action.payload);
  
} catch (error) {
  // yield put(createUserError(error))
}
};

