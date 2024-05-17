import {put} from "redux-saga/effects";
import * as API from "../api/index";
import {successSendTheme,themeError} from "../slices/themeSwitchSlices";

export function* themeSendSaga(action){
try {
  const {data:{data: theme}} = yield API.fetchThemeUpdate(action.payload);
  yield put(successSendTheme(theme));
} catch (error) {
  yield put(themeError(error))
}
};

