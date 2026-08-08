import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="atom-badge" [ngClass]="variant">
      <ng-content />
    </span>
  `,
  styles: [
    `
      .atom-badge {
        display: inline-flex;
        align-items: center;
        padding: 0.25rem 0.65rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        text-transform: capitalize;
      }
      .atom-badge.primary {
        background: #dbeafe;
        color: #1e40af;
      }
      .atom-badge.success {
        background: #dcfce7;
        color: #15803d;
      }
      .atom-badge.warning {
        background: #fef3c7;
        color: #b45309;
      }
      .atom-badge.danger {
        background: #fee2e2;
        color: #b91c1c;
      }
      .atom-badge.neutral {
        background: #f1f5f9;
        color: #475569;
      }
    `,
  ],
})
export class Badge {
  @Input() variant: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
}
