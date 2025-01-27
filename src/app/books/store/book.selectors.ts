import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromBook from './book.reducer';

export const selectBookState = createFeatureSelector<fromBook.State>(
  fromBook.bookFeatureKey
);

// export const selectBooks = createSelector(
//   selectBookState,
//   // selectCurrentUser,
//   // selectAdminState,
//   (bookState) => { bookState.books}
// );
export const selectBooks = createSelector(selectBookState, state => state.books);

// export const selectLoading = createSelector(selectBookState, state => state.loading);
export const selectLoading = fromBook.bookFeature.selectLoading;



// const myState = {
//   book: {
//     books: [],
//     loading: false
//   }
// }
//
// const result = selectBooks(myState);

