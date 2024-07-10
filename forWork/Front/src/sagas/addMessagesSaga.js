import {put} from "redux-saga/effects";
import * as API from "../api/index";
import {successAddMessages,errorAddMessages} from "../slices/chatSlices";

export function* addMessagesSaga(action){
try {
  const {data:{data: message}} = yield API.fetchAddMessage(action.payload);
  yield put(successAddMessages(message));
} catch (error) {
  yield put(errorAddMessages(error))
}
};

