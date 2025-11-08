import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpService } from '@shared/services/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  template: `
    <div class="content">
      <div class="topbar"></div>
      <main class="welcome">
        <h1>Welcome to Fastasys</h1>
      </main>
      <div class="page">
        <router-outlet />
      </div>
    </div>
    <p-toast [position]="'bottom-right'" />
    <p-confirmdialog />
  `,
  styles: `
    main.welcome {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d6d7da;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    padding: 1rem;
    box-sizing: border-box;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ToastModule, ConfirmDialogModule],
})
export class App {
  private readonly http = inject(HttpService);
  protected readonly title = signal('fastasys');

  constructor() {
    this.http.get<WeatherForecast[]>('weatherforecast').subscribe(data => {
      console.log('Weather forecast data:', data);
    });
  }
}
