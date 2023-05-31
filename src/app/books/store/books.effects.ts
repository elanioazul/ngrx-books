import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom, EMPTY } from "rxjs";
import { BooksService } from "../books.service";
import { booksFetchAPISuccess, deleteBookAPISuccess, invokeBooksAPI, invokeDeleteBookAPI, invokeSaveNewBookAPI, invokeUpdateBookAPI, saveBookAPISuccess, updateBookAPISuccess } from "./books.action";
import { Router } from "@angular/router";
import { Appstate } from "src/app/shared/store/appstate";
import { Store, select } from "@ngrx/store";
import { setApiSatus } from "src/app/shared/store/app.action";
import { selectBooks } from "./books.selector";

@Injectable()
export class BooksEffecs {
  constructor(
    private actions$: Actions,
    private appStore: Store<Appstate>,
    private bookService: BooksService,
    private router: Router,
    private store: Store,
  ) {}

  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeBooksAPI),
      withLatestFrom(this.store.pipe(select(selectBooks))),
      switchMap(([, booksFromStore]) => {
        if (booksFromStore.length > 0) {
          return EMPTY;
        }
        return this.bookService.get()
        .pipe(
          map((data) => booksFetchAPISuccess({ allBooks: data }))
        )
      })
    )
  )

  saveNewBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeSaveNewBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(setApiSatus({apiStatus: {apiResponseMessage: '', apiStatus: ''}}));
        return this.bookService.create(action.newBookRequested)
        .pipe(
          map((data) => {
            if (data) {
              this.appStore.dispatch(setApiSatus({apiStatus: {apiResponseMessage: '', apiStatus: 'success'}}));
            }
            return saveBookAPISuccess({newBookCreated: data})
          })
        )
      })
    )
  )

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUpdateBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(setApiSatus({apiStatus: {apiResponseMessage: '', apiStatus: ''}}));
        return this.bookService.update(action.bookToEdit)
        .pipe(
          map((data) => {
            if (data) {
              this.appStore.dispatch(setApiSatus({apiStatus: {apiResponseMessage: '', apiStatus: 'success'}}));
            }
            return updateBookAPISuccess({bookEdited: data})
          })
        )
      })
    )
  )

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeDeleteBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(setApiSatus({apiStatus: {apiResponseMessage: '', apiStatus: ''}}));
        return this.bookService.delete(action.bookToDeleteId)
        .pipe(
          map((data) => {
            if (data) {
              this.appStore.dispatch(setApiSatus({apiStatus: {apiResponseMessage: '', apiStatus: 'success'}}));
            }
            return deleteBookAPISuccess({deletedBookId: action.bookToDeleteId})
          })
        )
      })
    )
  )
}
