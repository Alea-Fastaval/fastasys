import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Product, Sale } from '@shared/types';
import { Badge, Card } from '@shared/components';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, FormsModule, Card, Badge],
  templateUrl: './shop.html',
  styleUrl: './shop.scss',
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
