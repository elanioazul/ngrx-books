import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { booksFetchAPISuccess, saveBookAPISuccess } from "./books.action";

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
    })
);
