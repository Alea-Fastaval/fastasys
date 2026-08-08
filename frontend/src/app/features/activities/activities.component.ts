import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { Activity } from '@shared/types/activities.types';
import { Card } from '@shared/components/card/card';
import { Badge } from '@shared/components/badge/badge';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, MatIconModule, Card, Badge],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1>Activities & Events (Aktiviteter)</h1>
        <p>Explore roleplaying games, boardgame tournaments, and convention events.</p>
      </header>

      <div class="cards-grid">
        @for (activity of activities(); track activity.id) {
          <app-card [title]="activity.title" [subtitle]="'By ' + activity.author" [hoverable]="true">
            <p class="description">{{ activity.description }}</p>
            <div class="meta-row">
              <app-badge variant="primary">{{ activity.category }}</app-badge>
              <span>
                <mat-icon inline>group</mat-icon>
                {{ activity.minParticipants }}-{{ activity.maxParticipants }} players
              </span>
              <span>
                <mat-icon inline>schedule</mat-icon>
                {{ activity.durationMinutes }} mins
              </span>
            </div>
          </app-card>
        }
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
      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1.5rem;
      }
      .description {
        margin: 1rem 0;
        color: #374151;
        font-size: 0.95rem;
      }
      .meta-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
        margin-top: 1rem;
        font-size: 0.85rem;
      }
    `,
  ],
})
export class ActivitiesComponent implements OnInit {
  private readonly http = inject(HttpClient);

  public activities = signal<Activity[]>([]);

  public ngOnInit(): void {
    this.http.get<Activity[]>('/api/activities').subscribe(data => this.activities.set(data));
  }
}
