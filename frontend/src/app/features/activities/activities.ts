import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { Activity } from '@shared/types';
import { Badge, Card } from '@shared/components';
import { TranslatePipe } from '@shared/pipes';

@Component({
  selector: 'app-activities',
  imports: [CommonModule, MatIconModule, Card, Badge, TranslatePipe],
  templateUrl: './activities.html',
  styleUrl: './activities.scss',
})
export class ActivitiesComponent implements OnInit {
  private readonly http = inject(HttpClient);

  public activities = signal<Activity[]>([]);

  public ngOnInit(): void {
    this.http.get<Activity[]>('/api/activities').subscribe(data => this.activities.set(data));
  }
}
