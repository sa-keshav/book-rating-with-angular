import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {BookActions} from './book.actions';
import {BookStoreService} from '../shared/book-store.service';


@Injectable()
export class BookEffects {

  actions$ = inject(Actions)
  bookStoreService = inject(BookStoreService)

  // TODO: Aufgabe von LoadBook effect
  // wenn Action loadBoos kommt, dann ...
  // - Bücher laden:  BookStoreService.getAll()
  //     - Erfolg: loadBooksSuccess
  //     - MissErfolg: loadBooksFailure

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      // wir filtern nach Book Actions
      ofType(BookActions.loadBooks),
      concatMap(() => this.bookStoreService.getAll().pipe(
        map(books => BookActions.loadBooksSuccess({ data: books})),
        catchError(error => of(BookActions.loadBooksFailure({ error })))
      ))
    )
  });

  // loadBooks$ = createEffect(() => {
  //   return this.actions$.pipe(
  //
  //     ofType(BookActions.loadBooks),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => BookActions.loadBooksSuccess({ data })),
  //         catchError(error => of(BookActions.loadBooksFailure({ error }))))
  //     )
  //   );
  // });


  // constructor(private actions$: Actions) {} this generated Code does not work therefore we inject the Actions using Inject()
}
