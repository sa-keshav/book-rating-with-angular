import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html', // über den binden wir die HTML-Datei
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Book Rating!';
}
