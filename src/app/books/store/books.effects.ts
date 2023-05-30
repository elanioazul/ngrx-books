import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BooksService } from "../books.service";
import { booksFetchAPISuccess, invokeBooksAPI } from "./books.action";
import { map, switchMap } from "rxjs";
import { Book } from "./book";
import { Injectable } from "@angular/core";

@Injectable()
export class BooksEffecs {
  constructor(
    private actions$: Actions,
    private bookService: BooksService
  ) {}

  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeBooksAPI),
      switchMap(() => {
        return this.bookService.get()
        .pipe(
          map((data) => booksFetchAPISuccess({ allBooks: data }))
        )
      })
    )
  )
}
