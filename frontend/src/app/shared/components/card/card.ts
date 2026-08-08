import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="atom-card" [class.hoverable]="hoverable">
      @if (title) {
        <div class="atom-card-header">
          <h3 class="atom-card-title">{{ title }}</h3>
          @if (subtitle) {
            <span class="atom-card-subtitle">{{ subtitle }}</span>
          }
        </div>
      }
      <div class="atom-card-content">
        <ng-content />
      </div>
    </div>
  `,
  styles: [
    `
      .atom-card {
        background: var(--surface-color, #ffffff);
        border: 1px solid var(--border-color, #e2e8f0);
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease;
        position: relative;
      }
      .atom-card.hoverable:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      }
      .atom-card-header {
        margin-bottom: 1rem;
      }
      .atom-card-title {
        font-size: 1.2rem;
        font-weight: 700;
        color: #1e293b;
        margin: 0;
      }
      .atom-card-subtitle {
        font-size: 0.85rem;
        color: #64748b;
        margin-top: 0.25rem;
        display: block;
      }
      .atom-card-content {
        color: #334155;
      }
    `,
  ],
})
export class Card {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() hoverable = false;
}
