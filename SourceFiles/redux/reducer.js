import {combineReducers} from 'redux';
import payment from './payments/reducer';
import profile from '../screens/profile/reducer';

const rootreducer = combineReducers({
  payment,
  profile,
});
export default rootreducer;
