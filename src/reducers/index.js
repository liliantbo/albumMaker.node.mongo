import { combineReducers } from 'redux';
import authReducer from './authReducer';
import albumReducer from './albumReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alb: albumReducer
});

export default rootReducer;
