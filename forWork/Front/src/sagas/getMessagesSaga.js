import {put} from "redux-saga/effects";
import * as API from "../api/index";
import {successGetMessages,errorGetMessages} from "../slices/chatSlices";

export function* getMessagesSaga(action){
try {
  const {data:{data: messages}} = yield API.fetchGetMessages(action.payload);
  yield put(successGetMessages(messages));
} catch (error) {
  yield put(errorGetMessages(error))
}
};

