import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './store/book';

const url = 'http://localhost:3000/books';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  get(): Observable<Book[]> {
    return this.http.get<Book[]>(url)
  }
}
