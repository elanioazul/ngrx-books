import { Component, OnInit } from '@angular/core';
import { Book } from '../store/book';
import { Store, select } from '@ngrx/store';
import { selectBookById } from '../store/books.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { invokeUpdateBookAPI } from '../store/books.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { AppSelector } from 'src/app/shared/store/app.selector';
import { setApiSatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  book: Book = {
    id: 0,
    author: '',
    name: '',
    cost: 0
  }

  constructor(private store: Store, private route: ActivatedRoute, private router: Router, private appStore: Store<Appstate>) { }

  ngOnInit(): void {
    let fetchFormData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        let id = Number(param.get('id'));
        return this.store.pipe(select(selectBookById(id)))
      })
    )

    fetchFormData$.subscribe((data) => {
      if (data !== null) this.book = {...data};
      else {this.router.navigate(['/'])}
    })

  }

  update(): void {
    this.store.dispatch(invokeUpdateBookAPI({bookToEdit: {...this.book}}));

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
