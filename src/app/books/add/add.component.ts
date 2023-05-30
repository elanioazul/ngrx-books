import { Component, OnInit } from '@angular/core';
import { Book } from '../store/book';
import { Store } from '@ngrx/store';
import { invokeSaveNewBookAPI } from '../store/books.action';

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

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  save(): void {
    this.store.dispatch(invokeSaveNewBookAPI({newBookRequested: {...this.bookForm}}))
  }

}
