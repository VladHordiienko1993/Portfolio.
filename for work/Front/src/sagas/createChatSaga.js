import {put} from "redux-saga/effects";
import * as API from "../api/index";
import {successCreateChat,errorCreateChat} from "../slices/chatSlices";

export function* createChatSaga(action){
try {
  const {data:{data: chat}} = yield API.fetchCreateChat(action.payload);
  yield put(successCreateChat(chat));
} catch (error) {
  yield put(errorCreateChat(error))
}
};

