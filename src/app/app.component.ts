import {Component} from '@angular/core';
import {DashboardComponent} from './book/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [DashboardComponent],
  templateUrl: './app.component.html', // über den binden wir die HTML-Datei
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Book Rating!';
}
