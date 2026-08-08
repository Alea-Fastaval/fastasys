import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroForceShift } from '@shared/types/hero-force.types';
import { Badge, Card } from '@shared/components';

@Component({
  selector: 'app-hero-force',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatButtonModule, MatIconModule, Card, Badge],
  template: `
    <div style="padding: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <h1>Hero Force Shift Roster (Heltestyrken)</h1>
        <button mat-raised-button color="primary"><mat-icon>add</mat-icon> Create Shift</button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
        @for (shift of shifts(); track shift.id) {
          <app-card>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <h3 style="margin: 0;">{{ shift.title }}</h3>
              <app-badge [variant]="shift.currentParticipants >= shift.maxParticipants ? 'danger' : 'success'">
                {{ shift.currentParticipants }}/{{ shift.maxParticipants }}
              </app-badge>
            </div>

            <p style="color: #666; margin-bottom: 12px;">{{ shift.description }}</p>

            <div style="display: flex; gap: 8px; align-items: center; color: #888; font-size: 13px;">
              <mat-icon style="font-size: 16px; width: 16px; height: 16px;">schedule</mat-icon>
              <span>{{ shift.startTime | date: 'short' }} - {{ shift.endTime | date: 'shortTime' }}</span>
            </div>

            <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
              <button mat-stroked-button color="primary" [disabled]="shift.currentParticipants >= shift.maxParticipants">
                Sign Up
              </button>
            </div>
          </app-card>
        }
      </div>
    </div>
  `,
})
export class HeroForceComponent implements OnInit {
  private readonly http = inject(HttpClient);

  public shifts = signal<HeroForceShift[]>([]);

  public ngOnInit(): void {
    this.http.get<HeroForceShift[]>('/api/hero-force/shifts').subscribe(data => this.shifts.set(data));
  }
}
