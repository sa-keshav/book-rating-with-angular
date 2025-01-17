import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from './book';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  #baseUrl = 'https://api.angular.schule'; // InjektionToken (also lieber in den Config auslagern)
  #http = inject(HttpClient)

  getAll(): Observable<Book[]> {
    return this.#http.get<Book[]>(this.#baseUrl + '/books')
  }

  getSingle(isbn: string) :Observable<Book> {
    return this.#http.get<Book>(this.#baseUrl + '/books/' + isbn)
  }

  create(book: Book) :Observable<Book> {
    return this.#http.post<Book>(this.#baseUrl + '/books', book)
  }

  search(term: string) : Observable<Book[]> {
    return this.#http.get<Book[]>(this.#baseUrl + '/books/search/' + term)
  }

  constructor() {
  }
}
