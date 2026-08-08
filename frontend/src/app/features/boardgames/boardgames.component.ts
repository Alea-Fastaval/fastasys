import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Boardgame, BoardgameLoan } from '@shared/types/boardgames.types';
import { Card } from '@shared/components/card/card';
import { Badge } from '@shared/components/badge/badge';

@Component({
  selector: 'app-boardgames',
  standalone: true,
  imports: [CommonModule, FormsModule, Card, Badge],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1>Boardgame Library & Loans</h1>
        <p>Browse game catalog, check out titles, and manage active loans.</p>
      </header>

      <div class="search-bar">
        <input
          type="text"
          [(ngModel)]="searchQuery"
          (input)="onSearch()"
          placeholder="Search by game title, author, barcode..."
          class="search-input"
        />
      </div>

      <div class="grid-layout">
        <div class="games-section">
          <h2>Game Catalog</h2>
          <div class="games-cards">
            @for (game of games(); track game.id) {
              <app-card [title]="game.title" [subtitle]="'By ' + game.author" [hoverable]="true">
                <div class="status-chip">
                  <app-badge [variant]="game.isPresent ? 'success' : 'danger'">
                    {{ game.isPresent ? 'Available' : 'On Loan' }}
                  </app-badge>
                </div>
                <div class="game-meta">
                  <span>👥 {{ game.minPlayers }}-{{ game.maxPlayers }} Players</span>
                  <span>⏱️ {{ game.playingTimeMinutes }} mins</span>
                </div>
                <div class="action-bar">
                  @if (game.isPresent) {
                    <button class="btn btn-primary" (click)="checkout(game)">Checkout</button>
                  } @else {
                    <button class="btn btn-secondary" (click)="returnGame(game)">Return</button>
                  }
                </div>
              </app-card>
            }
          </div>
        </div>

        <div class="loans-section">
          <h2>Active Loans</h2>
          <app-card title="Loan Tracking">
            <div class="loans-list">
              @for (loan of loans(); track loan.id) {
                <div class="loan-item">
                  <div>
                    <strong>{{ loan.boardgameTitle }}</strong>
                    <div class="subtext">Borrowed by {{ loan.participantName }}</div>
                  </div>
                  <div class="loan-status">
                    <app-badge [variant]="loan.returnedAt ? 'success' : 'warning'">
                      {{ loan.returnedAt ? 'Returned' : 'Active' }}
                    </app-badge>
                  </div>
                </div>
              }
            </div>
          </app-card>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }
      .page-header {
        margin-bottom: 1.5rem;
      }
      .search-bar {
        margin-bottom: 2rem;
      }
      .search-input {
        width: 100%;
        max-width: 500px;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        border: 1px solid #cbd5e1;
        font-size: 1rem;
      }
      .grid-layout {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
      }
      @media (max-width: 900px) {
        .grid-layout {
          grid-template-columns: 1fr;
        }
      }
      .games-cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
      }
      .status-chip {
        position: absolute;
        top: 1rem;
        right: 1rem;
      }
      .game-meta {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        font-size: 0.85rem;
        color: #475569;
      }
      .action-bar {
        margin-top: 1rem;
      }
      .btn {
        padding: 0.5rem 1rem;
        border-radius: 8px;
        border: none;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
      }
      .btn-primary {
        background: #10b981;
        color: white;
      }
      .btn-primary:hover {
        background: #059669;
      }
      .btn-secondary {
        background: #64748b;
        color: white;
      }
      .btn-secondary:hover {
        background: #475569;
      }
      .loans-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 0.5rem;
      }
      .loan-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid #f1f5f9;
      }
      .subtext {
        font-size: 0.8rem;
        color: #64748b;
      }
    `,
  ],
})
export class BoardgamesComponent implements OnInit {
  private readonly http = inject(HttpClient);

  public games = signal<Boardgame[]>([]);
  public loans = signal<BoardgameLoan[]>([]);
  public searchQuery = '';

  public ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    const url = this.searchQuery ? `/api/boardgames?search=${encodeURIComponent(this.searchQuery)}` : '/api/boardgames';
    this.http.get<Boardgame[]>(url).subscribe(data => this.games.set(data));
    this.http.get<BoardgameLoan[]>('/api/boardgames/loans').subscribe(data => this.loans.set(data));
  }

  public onSearch(): void {
    this.loadData();
  }

  public checkout(game: Boardgame): void {
    this.http.post(`/api/boardgames/${game.id}/checkout`, { participantId: 1 }).subscribe(() => this.loadData());
  }

  public returnGame(game: Boardgame): void {
    this.http.post(`/api/boardgames/${game.id}/return`, {}).subscribe(() => this.loadData());
  }
}
