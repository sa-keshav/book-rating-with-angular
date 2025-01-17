import {Injectable} from '@angular/core';
import {Book} from './book';
import {RATING_DOWN_LIMIT, RATING_UP_LIMIT} from '../book/book.component';

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
      rating: Math.min(book.rating + 1, RATING_UP_LIMIT)
    };
  }
  rateDown(book: Book): Book {
    if (book.rating <= RATING_DOWN_LIMIT) {
      return book;
    }
    return {
      ...book, rating:Math.max(book.rating - 1)
    };
  }
  constructor() { }
}
