import {Component, computed, input, output} from '@angular/core';
import {Book} from '../shared/book';
import {CurrencyPipe} from '@angular/common';
import {RatingComponent} from '../rating/rating.component';
import {RouterLink} from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../shared/confirmation-dialog/confirmation-dialog.component';


const MAX_RATING = 5;
const MIN_RATING = 1;

@Component({
  selector: 'app-book',
  imports: [CurrencyPipe, RatingComponent, RouterLink, MatDialogModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // Input: hier fließen daten von Eltern komponente hinein.
  // Die Daten fließen immer von oben nach unten
  readonly book = input.required<Book>();
  readonly minRating = input(MIN_RATING)
  readonly maxRating = input(MAX_RATING)

  // Output: fließen Daten von hier zu Elternkomponente
  // von unten nach oben
  rateUp = output<Book>();
  rateDown = output<Book>();
  delete = output<Book>()

  constructor(private dialog: MatDialog) {
  }

  disableRateUp = computed(() => this.book().rating >= this.maxRating())
  disableRateDown = computed(() => this.book().rating <= this.minRating())

  doRateUp() {
    this.rateUp.emit(this.book())
  }

  doRateDown() {
    this.rateDown.emit(this.book())
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit(this.book())
        console.log("OK triggert ")
      } else {
        console.log("CANCEL triggert")
      }
    })
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
