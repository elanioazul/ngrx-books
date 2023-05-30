import { createAction, props } from "@ngrx/store";
import { Book } from "./book";

export const invokeBooksAPI = createAction(
  "[Books API] invoke books fetch API"
)
export const booksFetchAPISuccess = createAction(
  "[Books API] books were fetched correctly from API",
  props<{allBooks: Book[]}>()
)
