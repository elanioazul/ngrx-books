import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBooks } from '../store/books.selector';
import { invokeBooksAPI } from '../store/books.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  $books = this.store.pipe(select(selectBooks))

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(invokeBooksAPI())
  }

  openDeleteModal(id: number): void {
    console.log(id);

  }

}
