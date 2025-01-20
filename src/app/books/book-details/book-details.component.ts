import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {BookStoreService} from '../shared/book-store.service';
import {Book} from '../shared/book';
import {BookComponent} from '../book/book.component';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink, BookComponent],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {

  // einfache properties kann man einfach optional machen, aber signals nicht.
  // Daher nutzen wir undefined hier
  readonly book = signal<Book | undefined>(undefined)

  private route = inject(ActivatedRoute);
  private bookStoreService = inject(BookStoreService);

  constructor() {
    // PULL basierten weg, bei den weird der isbn sich nicht aktualisieren, sondern einmalig geladen
    // ein großes Object in den alles steht was zu unsere Route gehört.
    // das nutzen wir lieber nicht weil wenn isbn sich ändert, wird sich die Seite nicht aktualisieren.
    // const isbn = this.route.snapshot.paramMap.get('isbn'); // aus den path: '/books/:isbn
    // console.log(isbn);

    // PUSH basierten weg: bei den Fall jede Änderungen an isbn wird mitgeteilt
    // das wird jedes Mal durchlaufen sobald isbn (param) sich ändert.
    // mit fragment können wir auf #blabla in der URI zugreifen.
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn') // oder ! benutzen anstatt if condition: params.get('isbn')!
      if (isbn !== null) {
        this.bookStoreService.getSingle(isbn!).subscribe(
        book => {
          this.book.set(book)
        })
      }
    })
  }
}
