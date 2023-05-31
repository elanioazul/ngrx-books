import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { booksFetchAPISuccess, deleteBookAPISuccess, saveBookAPISuccess, updateBookAPISuccess } from "./books.action";

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
    initialState,
    on(booksFetchAPISuccess, (state, { allBooks }) => {
      return allBooks
    }),
    on(saveBookAPISuccess, (state, {newBookCreated}) => {
      let newState = [...state];
      newState.unshift(newBookCreated);
      return newState;
    }),
    on(updateBookAPISuccess, (state, {bookEdited}) => {
      let newState = state.filter((book) => book.id !== bookEdited.id);
      newState.unshift(bookEdited);
      return newState;
    }),
    on(deleteBookAPISuccess, (state, {deletedBookId}) => {
      let newState = state.filter((book) => book.id !== deletedBookId);
      return newState;
    })
);
