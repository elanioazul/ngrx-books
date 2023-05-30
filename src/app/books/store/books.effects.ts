import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs";
import { BooksService } from "../books.service";
import { booksFetchAPISuccess, invokeBooksAPI, invokeSaveNewBookAPI, saveBookAPISuccess } from "./books.action";
import { Router } from "@angular/router";

@Injectable()
export class BooksEffecs {
  constructor(
    private actions$: Actions,
    private bookService: BooksService,
    private router: Router,
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

  saveNewBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeSaveNewBookAPI),
      switchMap((action) => {
        return this.bookService.create(action.newBookRequested)
        .pipe(
          tap(() => this.router.navigate([''])),
          map((data) => saveBookAPISuccess({newBookCreated: data}))
        )
      })
    )
  )
}
