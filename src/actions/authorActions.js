import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
  return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function createAuthorSuccess(author) {
  return {type: types.CREATE_AUTHOR_SUCCESS, author};
}

export function updateAuthorSuccess(author) {
  return {type: types.UPDATE_AUTHOR_SUCCESS, author};
}

export function deleteAuthorSuccess(authorId) {
  return {type: types.DELETE_AUTHOR_SUCCESS, authorId};
}

export function deleteAuthorInProgress(authorId) {
  return {type: types.DELETE_AUTHOR_IN_PROGRESS, authorId};
}

export function deleteAuthorComplete(authorId) {
  return {type: types.DELETE_AUTHOR_COMPLETE, authorId};
}

export function loadAuthors() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return AuthorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      throw(error);
    });
  };
}

export function beginDeleteAuthor(authorId) {
  return function (dispatch, getState) {
    dispatch(deleteAuthorInProgress(authorId));
  };
}

export function completeDeleteAuthor(authorId) {
  return function (dispatch, getState) {
    dispatch(deleteAuthorComplete(authorId));
  };
}

export function saveAuthor(author) {
  return function (dispatch, getState) {
    const inAuthor = {
      id: author.id,
      lastName: author.lastName,
      firstName: author.firstName
    };

    dispatch(beginAjaxCall());
    return AuthorApi.saveAuthor(inAuthor).then(savedAuthor => {
      if (author.id) {
        dispatch(updateAuthorSuccess(savedAuthor));
      } else {
        dispatch(createAuthorSuccess(savedAuthor));
      }
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteAuthor(authorId) {
  return function (dispatch, getState) {
    dispatch(beginDeleteAuthor(authorId));
    const currentState = getState();

    let coursesWithAuthor = currentState.courses.filter(course => course.authorId === authorId);

    if (coursesWithAuthor.length <= 0) {
      dispatch(beginAjaxCall());
      return AuthorApi.deleteAuthor(authorId).then(() => {
        dispatch(deleteAuthorSuccess(authorId));
        dispatch(completeDeleteAuthor(authorId));
      }).catch(error => {
        dispatch(ajaxCallError(error));
        dispatch(completeDeleteAuthor(authorId));
        throw(error);
      });
    } else {
      const errMessage = "Cannot delete author who is attached to one or more courses";
      return new Promise((resolve, reject) => {
        dispatch(completeDeleteAuthor(authorId));
        reject(errMessage);
      });
    }
  };
}
