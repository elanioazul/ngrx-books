import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBooks } from '../store/books.selector';
import { invokeBooksAPI, invokeDeleteBookAPI } from '../store/books.action';
import * as bootstrap from 'bootstrap';
import { Appstate } from 'src/app/shared/store/appstate';
import { AppSelector } from 'src/app/shared/store/app.selector';
import { setApiSatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('deleteModal') modal!: ElementRef<HTMLDivElement>;
  deleteModal!: bootstrap.Modal;
  idToDelete: number = 0;

  $books = this.store.pipe(select(selectBooks))

  constructor(private store: Store, private appStore: Store<Appstate>) { }

  ngOnInit(): void {
    this.store.dispatch(invokeBooksAPI());
  }

  ngAfterViewInit(): void {
    this.deleteModal = new bootstrap.Modal(this.modal.nativeElement, {keyboard: false})
  }

  openDeleteModal(id: number): void {
    this.idToDelete = id;
    this.deleteModal.show();

  }

  cancel(): void {
    this.deleteModal.hide();
  }

  confirmDelete(): void {
    this.store.dispatch(invokeDeleteBookAPI({bookToDeleteId: this.idToDelete}));

    let appState$ = this.appStore.pipe(select(AppSelector));
    appState$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        this.appStore.dispatch(
          setApiSatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.deleteModal.hide()
      }
    })
  }

}
