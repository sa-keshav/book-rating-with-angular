import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-create',
  imports: [ReactiveFormsModule],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {

  bookForm = new FormGroup({
    isbn: new FormControl('', {nonNullable: true, validators: [
      Validators.required,
        Validators.minLength(7),
        Validators.maxLength(15),
        Validators.pattern(/^[0-9]*$/)
      ]}),
    title: new FormControl('', {nonNullable: true, validators: [
      Validators.required,
        Validators.maxLength(100)

      ]}),
    description: new FormControl('', {nonNullable: true, validators: []}),
    rating: new FormControl(5, {nonNullable: true, validators: [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
      ]}),
    price: new FormControl(0, {nonNullable: true, validators: [
      Validators.required,
        Validators.min(0)
      ]})
  });

  isInvalid(control: FormControl): boolean {
    return control.invalid && control.touched
  }

  hasError(control: FormControl, errorCode: string) : boolean {
    // hat dieses Control diesen bestimmten Fehler?
    return control.hasError(errorCode) && control.touched
  }
}
