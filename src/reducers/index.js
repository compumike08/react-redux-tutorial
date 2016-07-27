import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import deletesInProgress from './deleteProgressReducer';

const rootReducer = combineReducers({
  courses: courses,
  authors: authors,
  ajaxCallsInProgress: ajaxCallsInProgress,
  deletesInProgress: deletesInProgress
});

export default rootReducer;
