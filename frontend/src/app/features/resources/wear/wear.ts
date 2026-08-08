import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Card } from '@shared/components';
import { TranslatePipe } from '@shared/pipes';
import { WearItem } from '@shared/types';

@Component({
  selector: 'app-wear',
  imports: [CommonModule, Card, MatIcon, TranslatePipe],
  templateUrl: './wear.html',
  styleUrl: './wear.scss',
})
export class WearComponent implements OnInit {
  private readonly http = inject(HttpClient);

  public wearItems = signal<WearItem[]>([]);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<WearItem[]>('/api/wear/items').subscribe(data => this.wearItems.set(data));
  }

  public orderWear(wear: WearItem): void {
    this.http
      .post('/api/wear/order', { participantId: 1, wearItemId: wear.id, quantity: 1 })
      .subscribe(() => this.loadData());
  }
}
