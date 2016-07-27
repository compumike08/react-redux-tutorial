import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function deleteProgressReducer(state = initialState.deletesInProgress, action) {
  switch (action.type) {
    case types.DELETE_AUTHOR_IN_PROGRESS:
      return [
        ...state,
        Object.assign({}, action.authorId)
      ];

    case types.DELETE_AUTHOR_ABORTED:
      return [
        ...state.filter(deletesInProgress => deletesInProgress !== action.authorId)
      ];

    case types.DELETE_AUTHOR_COMPLETED:
      state.forEach(deletesInProgress => console.log(deletesInProgress.authorId));
      return [
        ...state.filter(deletesInProgress => deletesInProgress.authorId !== action.authorId.authorId)
      ];

    default:
      return state;
  }
}
