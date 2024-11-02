import {put} from "redux-saga/effects";
import * as API from "../api/index";
import {sessionSuccess,sessionError} from "../slices/userSlices";

export function* sessionUserSaga(){
// try {
//   const {data:{data: user}} = yield API.fetchCheckSessionUser();
//   yield put(sessionSuccess(user));
// } catch (error) {
//   yield put(sessionError(error))
// }
try {
  // Извлечение токена из localStorage
  const token = localStorage.getItem('jwtToken');

  if (!token) {
    throw new Error("No token found");
  }

  // Вызов API для проверки сессии с токеном в заголовках
  const { data: { data: user } } = yield API.fetchCheckSessionUser(token);

  // Успешно получили данные пользователя
  yield put(sessionSuccess(user));
} catch (error) {
  // Обработка ошибок
  yield put(sessionError(error));
}



};

