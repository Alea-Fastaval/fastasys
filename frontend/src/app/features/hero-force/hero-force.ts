import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroForceShift } from '@shared/types';
import { Badge, Card } from '@shared/components';

@Component({
  selector: 'app-hero-force',
  imports: [CommonModule, MatCardModule, MatChipsModule, MatButtonModule, MatIconModule, Card, Badge],
  templateUrl: './hero-force.html',
  styleUrl: './hero-force.scss',
})
export class HeroForceComponent implements OnInit {
  private readonly http = inject(HttpClient);

  public shifts = signal<HeroForceShift[]>([]);

  public ngOnInit(): void {
    this.http.get<HeroForceShift[]>('/api/hero-force/shifts').subscribe(data => this.shifts.set(data));
  }
}
