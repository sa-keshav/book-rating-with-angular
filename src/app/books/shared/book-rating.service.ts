import { Injectable } from '@angular/core';
import {Book} from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  // es sind zwei Implementierung Möglichkeiten:
  // 1) direkt mit if klären, das wert nicht an Grenzen gekommen ist.
  // 2) oder in max/min Funktionen für den Fehler fall die Grenze mitgeben
  // daher die Funktionen anders implementiert.
  rateUp(book: Book): Book {
    return {
      ...book,
      rating: Math.min(book.rating + 1, 5)
    };
  }
  rateDown(book: Book): Book {
    if (book.rating <= 1) {
      return book;
    }
    return {
      ...book, rating:Math.max(book.rating - 1)
    };
  }
  constructor() { }
}
