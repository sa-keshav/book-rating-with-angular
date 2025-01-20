import {Routes} from '@angular/router';

export const routes: Routes = [
  // bei Weiterleitung vom leeren Pfad immer mit pathMatch: full
  {path: '', redirectTo: 'books', pathMatch: 'full'},

  // Eager loading würde so aussehen
  //...booksRoutes,
  // weitere Beispiele:
  // ...adminRoutes,
  // ...userRoutes

  {
    path: 'books',
    loadChildren: () => import('./books/books.routes').then(m => m.booksRoutes) // dynamisches import statement
  }
];

