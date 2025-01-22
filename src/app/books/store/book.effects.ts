import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {BookActions} from './book.actions';


@Injectable()
export class BookEffects {

  actions$ = inject(Actions)

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookActions.loadBooks),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => BookActions.loadBooksSuccess({ data })),
          catchError(error => of(BookActions.loadBooksFailure({ error }))))
      )
    );
  });


  // constructor(private actions$: Actions) {} this generated Code does not work therefore we inject the Actions using Inject()
}
