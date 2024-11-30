import { legacy_createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import authReducer from './reducers/authReducer';
import loanReducer from './reducers/loanReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  loan: loanReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(
  persistedReducer,
  composer(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };
