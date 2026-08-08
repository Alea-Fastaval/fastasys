import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary" class="main-toolbar">
      <span class="brand">Fastasys</span>
      <span class="spacer"></span>

      @if (authService.isAuthenticated()) {
        <nav class="nav-links">
          <a mat-button routerLink="/participants" routerLinkActive="active-link">
            <mat-icon>people</mat-icon> Participants
          </a>
          <a mat-button routerLink="/activities" routerLinkActive="active-link">
            <mat-icon>casino</mat-icon> Activities
          </a>
          <a mat-button routerLink="/hero-force" routerLinkActive="active-link">
            <mat-icon>calendar_today</mat-icon> Hero Force
          </a>
          <a mat-button routerLink="/shop" routerLinkActive="active-link"> <mat-icon>shopping_cart</mat-icon> Shop </a>
          <a mat-button routerLink="/resources" routerLinkActive="active-link">
            <mat-icon>inventory_2</mat-icon> Resources
          </a>
          <a mat-button routerLink="/boardgames" routerLinkActive="active-link">
            <mat-icon>sports_esports</mat-icon> Boardgames
          </a>
          <a mat-button routerLink="/communications" routerLinkActive="active-link">
            <mat-icon>chat</mat-icon> Comms
          </a>
        </nav>
        <span class="spacer"></span>
        <button mat-icon-button (click)="logout()">
          <mat-icon>logout</mat-icon>
        </button>
      } @else {
        <a mat-button routerLink="/signup">Signup</a>
        <a mat-button routerLink="/login">Login</a>
      }
    </mat-toolbar>

    <main class="content">
      <router-outlet />
    </main>
  `,
  styles: [
    `
      .main-toolbar {
        position: sticky;
        top: 0;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      .brand {
        font-weight: bold;
        font-size: 1.25rem;
        letter-spacing: 0.5px;
      }
      .spacer {
        flex: 1 1 auto;
      }
      .nav-links {
        display: flex;
        gap: 0.5rem;
      }
      .active-link {
        background-color: rgba(255, 255, 255, 0.15);
      }
      .content {
        min-height: calc(100vh - 64px);
        background-color: #f8fafc;
      }
    `,
  ],
})
export class App {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
