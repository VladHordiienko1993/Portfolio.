import {takeEvery} from "redux-saga/effects";
import {createUserSaga} from "./userSaga";
import {userLogoutSaga} from './userLogoutSaga'
import { themeGetSaga } from "./themeGetSaga";
import {themeSendSaga} from './themeSendSaga';
import {sessionUserSaga} from './sessionUserSaga';
import {createChatSaga} from './createChatSaga';
import {addMessagesSaga} from './addMessagesSaga';
import {getMessagesSaga} from './getMessagesSaga';

function* rootSaga(){
  yield takeEvery('users/createUserRequest', createUserSaga);
  yield takeEvery('users/requestSignOutUser', userLogoutSaga);
  yield takeEvery('themes/themeRequest', themeGetSaga);
  yield takeEvery('themes/requestSendTheme',themeSendSaga);
  yield takeEvery('users/sessionUserRequest', sessionUserSaga);
  yield takeEvery('chats/requestCreateChat', createChatSaga);
  yield takeEvery('chats/requestAddMessages', addMessagesSaga);
  yield takeEvery('chats/requestGetMessages', getMessagesSaga);
  // takeLeading        пробую место takeEvery
};

export default rootSaga;