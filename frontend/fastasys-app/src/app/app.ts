import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './welcome.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WelcomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('fastasys-app');
}
