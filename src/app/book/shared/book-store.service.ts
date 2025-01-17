import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from './book';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  #apiUrl = 'https://api.angular.schule'; // InjektionToken (also lieber in den Config auslagern)
  #http = inject(HttpClient)

  getAll(): Observable<Book[]> {
    return this.#http.get<Book[]>(this.#apiUrl + '/books')
  }

  getSingle(isbn: string) {
  }

  create(book: Book) {
  }

  search(term: string) {
  }

  constructor() {
  }
}
