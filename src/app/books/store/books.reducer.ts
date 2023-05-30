import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { booksFetchAPISuccess } from "./books.action";

export const initialState: ReadonlyArray<Book> = [{
  "id": 1,
  "name": "Harry Potter and the Philosopher's Stone",
  "author": "J. K. Rowling",
  "cost": 520
}];

export const bookReducer = createReducer(
    initialState,
    on(booksFetchAPISuccess, (state, { allBooks }) => {
      return allBooks
    })
);
