import {Component, inject, OnDestroy, signal} from '@angular/core';
import {Book} from '../shared/book';
import {BookComponent} from '../book/book.component';
import {BookRatingService} from '../shared/book-rating.service';
import {BookStoreService} from '../shared/book-store.service';
import {AsyncPipe, DatePipe} from '@angular/common';
import {map, startWith, Subscription, timer} from 'rxjs';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [BookComponent, DatePipe, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy {

  books = signal<Book[]>([]);

  // Lösung 1
  currentDate1 = signal(Date.now())
  private readonly intervalId;

  // Lösung 2
  currentDate2 = signal(Date.now())
  timerSubscription: Subscription

  currentDate3 = signal(Date.now())


  // Lösung 4: mit Angular Signals
  readonly currentDate4 = toSignal(
    timer(0, 1000)
      .pipe(map(() => Date.now()), startWith(Date.now())),
    {requireSync: true} // dazu aus folien nach blättern
  )

  #rs = inject(BookRatingService);
  currentDate5= timer(0, 1000).pipe(map( _ => Date.now()))

  private bookStoreService = inject(BookStoreService);

  constructor() {
    this.bookStoreService.getAll().subscribe(books => {
      this.books.set(books)
    })

    // Lösung 1 continue
    this.intervalId = setInterval(() => {
      this.currentDate1.set(Date.now())
      console.log('COUNTER 1', this.currentDate1())
    }, 1000);

    // Lösung 2
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      this.currentDate2.set(Date.now())
      console.log('COUNTER 2', this.currentDate2())
    });

    // Lösung 3 continue : mit RxJs
    timer(0, 1000)
      .pipe(
        map(() => Date.now()),
        takeUntilDestroyed()
      ).subscribe(ts => this.currentDate3.set(ts))


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
  doDelete2(book: Book) {
    if (!confirm('Buch löschem')) {
      return;
    }
    this.bookStoreService.delete(book.isbn).subscribe(() => {
      this.books.update(books => books.filter(b => b.isbn !== book.isbn))
    })
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe()
    clearInterval(this.intervalId)
    console.log('Destroy')
  }

  // wenn man mit computed Signal das lesen würde, aber das wäre zu over-engineered.
  // booksCount = computed(() => this.books.length)
}
