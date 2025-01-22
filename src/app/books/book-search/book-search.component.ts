import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime, of, switchMap} from 'rxjs';
import {BookStoreService} from '../shared/book-store.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-book-search',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent {

  searchControl = new FormControl('', {nonNullable: true});

  private bookStoreService = inject(BookStoreService);

  // books = toSignal(
  //   this.searchControl.valueChanges.pipe(
  //     filter( term => term.length >= 3),
  //     debounceTime(200), // Schicke das erst request, wenn der Nutzer aufgehört hat zu Tippen, damit wir der Server nicht mit viele Anfragen belasten
  //     switchMap(term => this.bookStoreService.search(term))
  //   )
  // )

  books = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(200), // Schicke das erst request, wenn der Nutzer aufgehört hat zu Tippen, damit wir der Server nicht mit viele Anfragen belasten
      switchMap(term => {
        if (term.length >= 3) {
          return this.bookStoreService.search(term)
        } else {
          return of([])
        }
      })
    ));
}
