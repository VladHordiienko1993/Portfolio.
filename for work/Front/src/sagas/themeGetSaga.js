import {put} from "redux-saga/effects";
import * as API from "../api/index";
import {getTheme,themeError} from "../slices/themeSwitchSlices";

export function* themeGetSaga(action){
try {
  const {data:{data: theme}} = yield API.fetchThemeGet(action.payload);
  yield put(getTheme(theme));
} catch (error) {
  yield put(themeError(error))
}
};

