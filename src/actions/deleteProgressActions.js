import * as types from './actionTypes';

export function beginDeleteAuthor(authorId) {
  return {type: types.DELETE_AUTHOR_IN_PROGRESS, authorId};
}

export function completeDeleteAuthor(authorId) {
  return {type: types.DELETE_AUTHOR_COMPLETED, authorId};
}

export function abortDeleteAuthor(authorId) {
  return {type: types.DELETE_AUTHOR_ABORTED, authorId};
}
