import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, ButtonModule, CardModule],
  template: `
    <div class="welcome-container">
      <p-card header="Welcome to Fastasys" [style]="{ width: '500px' }">
        <p>
          This is a modern mono-repo with .NET 9 backend and Angular 20 frontend.
        </p>
        <p>
          PrimeNG components are now available for use throughout the application.
        </p>
        <ng-template pTemplate="footer">
          <p-button label="Get Started" icon="pi pi-check" />
        </ng-template>
      </p-card>
    </div>
  `,
  styles: [`
    .welcome-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      padding: 2rem;
    }
  `]
})
export class WelcomeComponent {}
