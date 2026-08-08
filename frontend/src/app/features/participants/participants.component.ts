import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Participant } from '@shared/types/participants.types';
import { Badge } from '@shared/components/badge/badge';

@Component({
  selector: 'app-participants',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    Badge,
  ],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div>
          <h1>Participant Management (Deltagere)</h1>
          <p>Search, view profiles, and manage check-ins for Fastaval attendees.</p>
        </div>
      </header>

      <div class="toolbar">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search participants by name, email or barcode...</mat-label>
          <input matInput [(ngModel)]="searchQuery" (keyup.enter)="loadParticipants()" placeholder="e.g. John Doe" />
          <mat-icon matSuffix (click)="loadParticipants()">search</mat-icon>
        </mat-form-field>
      </div>

      <table mat-table [dataSource]="participants()" class="mat-elevation-z2 full-table">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let p">{{ p.id }}</td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let p">
            <strong>{{ p.firstName }} {{ p.lastName }}</strong>
          </td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let p">{{ p.email }}</td>
        </ng-container>

        <ng-container matColumnDef="barcode">
          <th mat-header-cell *matHeaderCellDef>Barcode</th>
          <td mat-cell *matCellDef="let p">
            <code>{{ p.barcode }}</code>
          </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let p">
            <app-badge [variant]="p.isCheckedIn ? 'success' : 'danger'">
              {{ p.isCheckedIn ? 'Checked In' : 'Not Checked In' }}
            </app-badge>
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let p">
            @if (!p.isCheckedIn) {
              <button mat-flat-button color="accent" (click)="checkIn(p.id)">
                <mat-icon>how_to_reg</mat-icon> Check In
              </button>
            } @else {
              <span class="checked-time">Checked in at {{ p.checkedInAt | date: 'shortTime' }}</span>
            }
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
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
        margin-bottom: 1.5rem;
      }
      .toolbar {
        margin-bottom: 1.5rem;
      }
      .search-field {
        width: 100%;
        max-width: 500px;
      }
      .full-table {
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
      }
      .checked-time {
        font-size: 0.85rem;
        color: #4b5563;
      }
    `,
  ],
})
export class ParticipantsComponent implements OnInit {
  private readonly http = inject(HttpClient);

  public participants = signal<Participant[]>([]);
  public searchQuery = '';
  public displayedColumns = ['id', 'name', 'email', 'barcode', 'status', 'actions'];

  public ngOnInit(): void {
    this.loadParticipants();
  }

  public loadParticipants(): void {
    const url = this.searchQuery
      ? `/api/participants?search=${encodeURIComponent(this.searchQuery)}`
      : '/api/participants';
    this.http.get<Participant[]>(url).subscribe(data => this.participants.set(data));
  }

  public checkIn(id: number): void {
    this.http.post(`/api/participants/${id}/checkin`, {}).subscribe(() => this.loadParticipants());
  }
}
