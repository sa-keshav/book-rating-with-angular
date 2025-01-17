import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html', // über den binden wir die HTML-Datei
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Book Rating!';
}
