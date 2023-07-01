import { combineReducers } from 'redux';
import authReducer from './authReducer';
import albumReducer from './albumReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alb: albumReducer,
  adm: adminReducer
});

export default rootReducer;
