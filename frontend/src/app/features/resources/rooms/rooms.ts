import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Room } from '@shared/types';
import { Card } from '@shared/components';
import { TranslatePipe } from '@shared/pipes';

@Component({
  selector: 'app-rooms',
  imports: [CommonModule, Card, TranslatePipe],
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss',
})
export class RoomsComponent implements OnInit {
  private readonly http = inject(HttpClient);

  public rooms = signal<Room[]>([]);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<Room[]>('/api/rooms').subscribe(data => this.rooms.set(data));
  }

  // Additional room‑specific actions can be added here
}
