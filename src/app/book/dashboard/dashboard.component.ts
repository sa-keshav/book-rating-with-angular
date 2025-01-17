import {Component, inject, signal} from '@angular/core';
import {Book} from '../shared/book';
import {BookComponent} from '../book/book.component';
import {BookRatingService} from '../shared/book-rating.service';
import {BookStoreService} from '../shared/book-store.service';

@Component({
  selector: 'app-dashboard',
  imports: [BookComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  books = signal<Book[]>([]);

  #rs = inject(BookRatingService);
  private bookStoreService = inject(BookStoreService);


  constructor() {
    this.bookStoreService.getAll().subscribe(books => {
      this.books.set(books)
    })
  }

  doRateUp(book: Book) {
    const ratedBook = this.#rs.rateUp(book)
    this.#updatedList(ratedBook)
  }

  doRateDown(book: Book) {
    const ratedBook = this.#rs.rateDown(book)
    this.#updatedList(ratedBook)
  }

  #updatedList(ratedBook: Book) {
    this.books.update(
      books => books.map(book => book.isbn === ratedBook.isbn ? ratedBook : book)
    )

    // oder mit set geht es genauso gut. Aber update ist mehr empfohlen
    //this.books.set(this.books().map(book => book.isbn === ratedBook.isbn ? ratedBook : book))

  }

  // wenn man mit computed Signal das lesen würde, aber das wäre zu over-engineered.
  // booksCount = computed(() => this.books.length)

}
