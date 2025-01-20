import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-book-create',
  imports: [ReactiveFormsModule],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {

  bookForm = new FormGroup({
    isbn: new FormControl('', {nonNullable: true, validators: []}),
    title: new FormControl('', {nonNullable: true, validators: []}),
    description: new FormControl('', {nonNullable: true, validators: []}),
    rating: new FormControl(5, {nonNullable: true, validators: []}),
    price: new FormControl(0, {nonNullable: true, validators: []})
  });
}
