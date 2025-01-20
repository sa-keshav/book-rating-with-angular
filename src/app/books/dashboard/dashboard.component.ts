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

  // TODO: check if this list is updated on the UI
  doDelete(book: Book) {
    this.bookStoreService.delete(book.isbn).subscribe({
      next: () => this.bookStoreService.getAll().subscribe(
        books => {
          this.books.set(books)
        }
      )
    })
  }

  // eine einfachere Variation von delete mit nativen confirm() funktion und lokalen update der Liste
  doDelete2(book: Book){
    if (!confirm('Buch löschem')){
      return;
    }
    this.bookStoreService.delete(book.isbn).subscribe(() => {
      this.books.update(books => books.filter(b => b.isbn !== book.isbn))
    })
  }

    // wenn man mit computed Signal das lesen würde, aber das wäre zu over-engineered.
    // booksCount = computed(() => this.books.length)

  }
