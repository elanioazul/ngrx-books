import { createFeatureSelector } from '@ngrx/store';
import { Book } from './book';
 
export const selectBooks = createFeatureSelector<Book[]>('mybooks');