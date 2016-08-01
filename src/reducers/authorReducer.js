import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action) {
  if (action.type === types.LOAD_AUTHORS_SUCCESS) {
    const aryLen = action.authors.length;

    for(let i = 0; i < aryLen; i++){
      action.authors[i].deleting = false;
    }

    return action.authors;
  } else if (action.type === types.CREATE_AUTHOR_SUCCESS) {
    return [
      ...state,
      Object.assign({}, action.author)
    ];
  } else if (action.type === types.UPDATE_AUTHOR_SUCCESS) {
    return [
      ...state.filter(author => author.id !== action.author.id),
      Object.assign({}, action.author)
    ];
  } else if (action.type === types.DELETE_AUTHOR_SUCCESS) {
    return [
      ...state.filter(author => author.id !== action.authorId)
    ];
  } else if (action.type === types.DELETE_AUTHOR_IN_PROGRESS) {
    let authorAry = [...state.filter(author => author.id === action.authorId)];
    let authorObj = Object.assign({}, authorAry[0]);
    authorObj.deleting = true;
    return [
      ...state.filter(author => author.id !== action.authorId),
      Object.assign({}, authorObj)
    ];
  } else if (action.type === types.DELETE_AUTHOR_COMPLETE) {
    let authorAry = [...state.filter(author => author.id === action.authorId)];
    let authorObj = Object.assign({}, authorAry[0]);
    if (authorObj && authorObj.hasOwnProperty("id") && authorObj.id) {
      authorObj.deleting = false;
      return [
        ...state.filter(author => author.id !== action.authorId),
        Object.assign({}, authorObj)
      ];
    } else {
      return state;
    }
  } else {
    return state;
  }
}
