import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleWare from 'redux-saga';
// import todoReducer from '..slices/todoReducer';
import userReducer from '../slices/userSlices';
import rootSaga from '../sagas';



const sagaMiddleware = createSagaMiddleWare();

const store  = configureStore({
  devTools: true,
  reducer: {
    // todos: todoReducer,
    users: userReducer
  },
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware({thunk:false}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

