import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { bookReducer } from './store/books.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffecs } from './store/books.effects';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    StoreModule.forFeature("mybooks", bookReducer),
    EffectsModule.forFeature([BooksEffecs])
  ]
})
export class BooksModule { }
