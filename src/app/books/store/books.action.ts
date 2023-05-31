import { createAction, props } from "@ngrx/store";
import { Book } from "./book";

export const invokeBooksAPI = createAction(
  "[Books API] invoke books fetch API"
)
export const booksFetchAPISuccess = createAction(
  "[Books API] books were fetched correctly from API",
  props<{allBooks: Book[]}>()
)

export const invokeSaveNewBookAPI = createAction(
  "[Books API] create a book POST API request",
  props<{newBookRequested: Book}>()
)
export const saveBookAPISuccess = createAction(
  "[Books API] save book API success",
  props<{newBookCreated: Book}>()
)

export const invokeUpdateBookAPI = createAction(
  "[Books API] invoke update book API",
  props<{bookToEdit: Book}>()
)
export const updateBookAPISuccess = createAction(
  "[Books API] update book API success",
  props<{bookEdited: Book}>()
)

export const invokeDeleteBookAPI = createAction(
  "[Books API] invoke delete book API",
  props<{bookToDeleteId: number}>()
)
export const deleteBookAPISuccess = createAction(
  "[Books API] delete book API success",
  props<{deletedBookId: number}>()
)
