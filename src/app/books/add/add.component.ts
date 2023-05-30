import { Component, OnInit } from '@angular/core';
import { Book } from '../store/book';
import { Store, select } from '@ngrx/store';
import { invokeSaveNewBookAPI } from '../store/books.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { AppSelector } from 'src/app/shared/store/app.selector';
import { Router } from '@angular/router';
import { setApiSatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  bookForm: Book = {
    id: 0,
    author: '',
    name: '',
    cost: 0
  }

  constructor(private store: Store, private appStore: Store<Appstate>, private router: Router) { }

  ngOnInit(): void {
  }

  save(): void {
    this.store.dispatch(invokeSaveNewBookAPI({newBookRequested: {...this.bookForm}}))
    let appState$ = this.appStore.pipe(select(AppSelector));
    appState$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        this.appStore.dispatch(
          setApiSatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/']);
      }
    })
  }

}
