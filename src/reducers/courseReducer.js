import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
  if (action.type === types.LOAD_COURSES_SUCCESS) {
    const aryLen = action.courses.length;

    for (let i = 0; i < aryLen; i++) {
      action.courses[i].deleting = false;
    }

    return action.courses;
  } else if (action.type === types.CREATE_COURSE_SUCCESS) {
    return [
      ...state,
      Object.assign({}, action.course)
    ];
  } else if (action.type === types.UPDATE_COURSE_SUCCESS) {
    return [
      ...state.filter(course => course.id !== action.course.id),
      Object.assign({}, action.course)
    ];
  } else if (action.type === types.DELETE_COURSE_SUCCESS) {
    return [
      ...state.filter(course => course.id !== action.courseId)
    ];
  } else if (action.type === types.DELETE_COURSE_IN_PROGRESS) {
    let courseAry = state.filter(course => course.id === action.courseId);
    let courseObj = Object.assign({}, courseAry[0]);
    courseObj.deleting = true;

    return [
      ...state.filter(course => course.id !== action.courseId),
      Object.assign({}, courseObj)
    ];
  } else if (action.type === types.DELETE_COURSE_COMPLETE) {
    let courseAry = state.filter(course => course.id === action.courseId);
    let courseObj = Object.assign({}, courseAry[0]);

    if (courseObj && courseObj.hasOwnProperty("id") && courseObj.id) {
      courseObj.deleting = false;
      return [
        ...state.filter(course => course.id !== action.courseId),
        Object.assign({}, courseObj)
      ];
    } else {
      return state;
    }
  } else {
    return state;
  }
}
