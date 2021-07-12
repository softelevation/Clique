import {combineReducers} from 'redux';
import payment from './payments/reducer';

const rootreducer = combineReducers({
  payment,
});
export default rootreducer;
