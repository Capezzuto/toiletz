import { combineReducers } from 'redux';
import SearchReducer from './reducer_search';
import ToiletReducer from './reducer_toilets';
import ActiveToilet from './reducer_active_toilets';
import SignInReducer from './reducer_sign_in';
import {reducer as formReducer} from 'redux-form';
import ReviewsReducer from './reducer_reviews'

const rootReducer = combineReducers({
  search: SearchReducer,
  toilets: ToiletReducer,
  activeToilet:ActiveToilet,
  reviews: ReviewsReducer,
  user: SignInReducer,
  form:formReducer,
});

export default rootReducer;
