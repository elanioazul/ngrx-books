import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { booksFetchAPISuccess } from "./books.action";

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
    initialState,
    on(booksFetchAPISuccess, (state, { allBooks }) => {
      return allBooks
    })
);
