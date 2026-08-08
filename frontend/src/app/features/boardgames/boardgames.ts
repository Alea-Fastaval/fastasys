import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Boardgame, BoardgameLoan } from '@shared/types';
import { Badge, Card } from '@shared/components';

@Component({
  selector: 'app-boardgames',
  imports: [CommonModule, FormsModule, Card, Badge],
  templateUrl: './boardgames.html',
  styleUrl: './boardgames.scss',
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
