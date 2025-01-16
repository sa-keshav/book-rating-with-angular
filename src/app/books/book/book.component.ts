import {Component, input, output, signal} from '@angular/core';
import {Book} from '../shared/book';
import {CurrencyPipe} from '@angular/common';
import {RatingComponent} from '../rating/rating.component';

@Component({
  selector: 'app-book',
  imports: [CurrencyPipe, RatingComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // Input: hier fließen daten von Eltern komponente hinein.
  // Die Daten fließen immer von oben nach unten
  book = input.required<Book>();

  // Output: fließen Daten von hier zu Elternkomponente
  // von unten nach oben
  rateUp = output<Book>();
  rateDown = output<Book>();

  doRateUp(){
    this.rateUp.emit(this.book())
  }

  doRateDown(){
    this.rateDown.emit(this.book())
  }







  // This would not work
  // constructor() {
  //   console.log('CTOR', this.book())
  // }

  // This would work
  // ngOnInit(){
  //   console.log('INIT', this.book())
  // }
}
