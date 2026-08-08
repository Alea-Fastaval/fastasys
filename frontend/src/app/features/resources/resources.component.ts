import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FoodType, WearItem, Room } from '@shared/types/resources.types';
import { Card } from '@shared/components/card/card';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, FormsModule, Card],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1>Resource Management (Food, Wear & Rooms)</h1>
        <p>Manage catering options, wear orders, and convention venue rooms.</p>
      </header>

      <div class="sections-grid">
        <!-- Food Section -->
        <app-card title="Food & Catering">
          <div class="items-list">
            @for (food of foodTypes(); track food.id) {
              <div class="item-row">
                <div>
                  <strong>{{ food.name }}</strong> ({{ food.nameEnglish }})
                </div>
                <div class="item-action">
                  <span>{{ food.price | currency: 'DKK ' }}</span>
                  <button class="btn btn-sm" (click)="orderFood(food)">Order</button>
                </div>
              </div>
            }
          </div>
        </app-card>

        <!-- Wear Section -->
        <app-card title="Wear & Merchandise">
          <div class="items-list">
            @for (wear of wearItems(); track wear.id) {
              <div class="item-row">
                <div>
                  <strong>{{ wear.name }}</strong> (Size: {{ wear.size }})
                  <div class="subtext">Stock: {{ wear.stock }}</div>
                </div>
                <div class="item-action">
                  <span>{{ wear.price | currency: 'DKK ' }}</span>
                  <button class="btn btn-sm" (click)="orderWear(wear)" [disabled]="wear.stock <= 0">Order</button>
                </div>
              </div>
            }
          </div>
        </app-card>

        <!-- Rooms Section -->
        <div class="full-width">
          <app-card title="Rooms & Locations">
            <div class="rooms-grid">
              @for (room of rooms(); track room.id) {
                <div class="room-box">
                  <h3>{{ room.name }}</h3>
                  <div class="room-sub">{{ room.location }} • Cap: {{ room.capacity }}</div>
                  <p>{{ room.description }}</p>
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
        margin-bottom: 2rem;
      }
      .sections-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }
      .full-width {
        grid-column: 1 / -1;
      }
      @media (max-width: 768px) {
        .sections-grid {
          grid-template-columns: 1fr;
        }
      }
      .items-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 0.5rem;
      }
      .item-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        border-bottom: 1px solid #f1f5f9;
      }
      .item-action {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .subtext {
        font-size: 0.8rem;
        color: #64748b;
      }
      .btn {
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        border: none;
        font-weight: 600;
        cursor: pointer;
        background: #0284c7;
        color: white;
      }
      .btn:hover:not(:disabled) {
        background: #0369a1;
      }
      .btn:disabled {
        background: #cbd5e1;
        cursor: not-allowed;
      }
      .rooms-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
        margin-top: 0.5rem;
      }
      .room-box {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        padding: 1rem;
        border-radius: 8px;
      }
      .room-sub {
        font-size: 0.85rem;
        color: #475569;
        font-weight: 500;
        margin: 0.25rem 0 0.5rem 0;
      }
    `,
  ],
})
export class ResourcesComponent implements OnInit {
  private readonly http = inject(HttpClient);

  public foodTypes = signal<FoodType[]>([]);
  public wearItems = signal<WearItem[]>([]);
  public rooms = signal<Room[]>([]);

  public ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.http.get<FoodType[]>('/api/food/types').subscribe(data => this.foodTypes.set(data));
    this.http.get<WearItem[]>('/api/wear/items').subscribe(data => this.wearItems.set(data));
    this.http.get<Room[]>('/api/rooms').subscribe(data => this.rooms.set(data));
  }

  public orderFood(food: FoodType): void {
    this.http
      .post('/api/food/order', { participantId: 1, foodTypeId: food.id, date: new Date().toISOString() })
      .subscribe(() => this.loadData());
  }

  public orderWear(wear: WearItem): void {
    this.http
      .post('/api/wear/order', { participantId: 1, wearItemId: wear.id, quantity: 1 })
      .subscribe(() => this.loadData());
  }
}
