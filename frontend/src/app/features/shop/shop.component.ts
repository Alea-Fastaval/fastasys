import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Product, Sale } from '@shared/types/shop.types';
import { Card } from '@shared/components/card/card';
import { Badge } from '@shared/components/badge/badge';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, Card, Badge],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1>Shop & Economy Management (Kiosk & Merchandise)</h1>
        <p>Browse products, manage inventory stock, and process sales.</p>
      </header>

      <div class="shop-grid">
        <div class="products-section">
          <h2>Products</h2>
          <div class="product-cards">
            @for (product of products(); track product.id) {
              <app-card [title]="product.name" [hoverable]="true">
                <div class="card-badge">
                  <app-badge variant="neutral">{{ product.category }}</app-badge>
                </div>
                <p>{{ product.description }}</p>
                <div class="card-footer">
                  <span class="price">{{ product.price | currency: 'DKK ' }}</span>
                  <span class="stock" [class.low]="product.stock < 10">Stock: {{ product.stock }}</span>
                  <button class="btn btn-primary" (click)="buyProduct(product)" [disabled]="product.stock <= 0">
                    {{ product.stock > 0 ? 'Buy' : 'Out of Stock' }}
                  </button>
                </div>
              </app-card>
            }
          </div>
        </div>

        <div class="sales-section">
          <h2>Recent Sales</h2>
          <app-card title="Sales Activity">
            <table class="sales-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Customer</th>
                </tr>
              </thead>
              <tbody>
                @for (sale of sales(); track sale.id) {
                  <tr>
                    <td>{{ sale.saleDate | date: 'short' }}</td>
                    <td>{{ sale.productName }}</td>
                    <td>{{ sale.quantity }}</td>
                    <td>{{ sale.totalAmount | currency: 'DKK ' }}</td>
                    <td>{{ sale.participantName }}</td>
                  </tr>
                }
              </tbody>
            </table>
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
      .shop-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
      }
      @media (max-width: 900px) {
        .shop-grid {
          grid-template-columns: 1fr;
        }
      }
      .product-cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
      }
      .card-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
      }
      .card-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1.5rem;
        gap: 0.5rem;
      }
      .price {
        font-size: 1.25rem;
        font-weight: bold;
        color: #1e293b;
      }
      .stock {
        font-size: 0.85rem;
        color: #64748b;
      }
      .stock.low {
        color: #dc2626;
        font-weight: bold;
      }
      .btn {
        padding: 0.5rem 1rem;
        border-radius: 8px;
        border: none;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
      }
      .btn-primary {
        background: #3b82f6;
        color: white;
      }
      .btn-primary:hover:not(:disabled) {
        background: #2563eb;
      }
      .btn:disabled {
        background: #cbd5e1;
        cursor: not-allowed;
      }
      .sales-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 0.5rem;
        font-size: 0.9rem;
      }
      .sales-table th,
      .sales-table td {
        padding: 0.75rem 0.5rem;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }
    `,
  ],
})
export class ShopComponent implements OnInit {
  private readonly http = inject(HttpClient);

  public products = signal<Product[]>([]);
  public sales = signal<Sale[]>([]);

  public ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.http.get<Product[]>('/api/shop/products').subscribe(data => this.products.set(data));
    this.http.get<Sale[]>('/api/shop/sales').subscribe(data => this.sales.set(data));
  }

  public buyProduct(product: Product): void {
    this.http
      .post('/api/shop/orders', { productId: product.id, quantity: 1, participantId: 1 })
      .subscribe(() => this.loadData());
  }
}
