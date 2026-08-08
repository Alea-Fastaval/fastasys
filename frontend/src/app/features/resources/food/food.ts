import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Card } from '@shared/components';
import { TranslatePipe } from '@shared/pipes';
import { FoodType } from '@shared/types';

@Component({
  selector: 'app-food',
  imports: [CommonModule, Card, TranslatePipe, MatIcon],
  templateUrl: './food.html',
  styleUrl: './food.scss',
})
export class FoodComponent implements OnInit {
  private readonly http = inject(HttpClient);

  public foodTypes = signal<FoodType[]>([]);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<FoodType[]>('/api/food/types').subscribe(data => this.foodTypes.set(data));
  }

  public orderFood(food: FoodType): void {
    this.http
      .post('/api/food/order', { participantId: 1, foodTypeId: food.id, date: new Date().toISOString() })
      .subscribe(() => this.loadData());
  }
}
