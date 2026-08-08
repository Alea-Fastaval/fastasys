import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ticket, Newsletter } from '@shared/types/communications.types';
import { Card } from '@shared/components/card/card';
import { Badge } from '@shared/components/badge/badge';

@Component({
  selector: 'app-communications',
  standalone: true,
  imports: [CommonModule, FormsModule, Card, Badge],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1>Communication Systems (Tickets, Newsletters & Broadcasts)</h1>
        <p>Support ticket management, newsletter creation, and automated notifications.</p>
      </header>

      <div class="comms-grid">
        <!-- Tickets Section -->
        <div class="tickets-section">
          <h2>Support Tickets</h2>
          <app-card title="Submit New Support Ticket">
            <div class="form-group">
              <input type="text" [(ngModel)]="newTicketTitle" placeholder="Issue Subject" class="input-field" />
            </div>
            <div class="form-group">
              <textarea
                [(ngModel)]="newTicketDesc"
                placeholder="Describe the issue..."
                rows="3"
                class="input-field"
              ></textarea>
            </div>
            <button class="btn btn-primary" (click)="submitTicket()" [disabled]="!newTicketTitle || !newTicketDesc">
              Submit Ticket
            </button>
          </app-card>

          <div class="ticket-list">
            @for (ticket of tickets(); track ticket.id) {
              <app-card [title]="ticket.title" [hoverable]="true">
                <div class="status-badge">
                  <app-badge [variant]="ticket.status === 'Open' ? 'primary' : 'neutral'">{{
                    ticket.status
                  }}</app-badge>
                </div>
                <p>{{ ticket.description }}</p>
                <div class="ticket-footer">
                  <span>Created by {{ ticket.createdBy }}</span>
                  <span>{{ ticket.createdAt | date: 'short' }}</span>
                </div>
              </app-card>
            }
          </div>
        </div>

        <!-- Newsletters Section -->
        <div class="newsletters-section">
          <h2>Newsletters & Broadcasts</h2>
          <app-card title="Publish Broadcast Newsletter">
            <div class="form-group">
              <input type="text" [(ngModel)]="newSubject" placeholder="Newsletter Subject" class="input-field" />
            </div>
            <div class="form-group">
              <textarea
                [(ngModel)]="newBody"
                placeholder="Newsletter content..."
                rows="4"
                class="input-field"
              ></textarea>
            </div>
            <button class="btn btn-accent" (click)="publishNewsletter()" [disabled]="!newSubject || !newBody">
              Send Broadcast
            </button>
          </app-card>

          <div class="newsletter-list">
            @for (newsletter of newsletters(); track newsletter.id) {
              <app-card [title]="newsletter.subject" [hoverable]="true">
                <p>{{ newsletter.body }}</p>
                <div class="newsletter-footer">
                  <span>Sent to {{ newsletter.recipientCount }} recipients</span>
                  <span>{{ newsletter.createdAt | date: 'mediumDate' }}</span>
                </div>
              </app-card>
            }
          </div>
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
      .comms-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }
      @media (max-width: 900px) {
        .comms-grid {
          grid-template-columns: 1fr;
        }
      }
      .form-group {
        margin-bottom: 1rem;
      }
      .input-field {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        font-size: 0.95rem;
      }
      .btn {
        padding: 0.5rem 1.25rem;
        border-radius: 8px;
        border: none;
        font-weight: 600;
        cursor: pointer;
      }
      .btn-primary {
        background: #6366f1;
        color: white;
      }
      .btn-primary:hover:not(:disabled) {
        background: #4f46e5;
      }
      .btn-accent {
        background: #ec4899;
        color: white;
      }
      .btn-accent:hover:not(:disabled) {
        background: #db2777;
      }
      .btn:disabled {
        background: #cbd5e1;
        cursor: not-allowed;
      }
      .status-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
      }
      .ticket-footer,
      .newsletter-footer {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        color: #64748b;
        margin-top: 1rem;
      }
      .ticket-list,
      .newsletter-list {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    `,
  ],
})
export class CommunicationsComponent implements OnInit {
  private readonly http = inject(HttpClient);

  public tickets = signal<Ticket[]>([]);
  public newsletters = signal<Newsletter[]>([]);

  public newTicketTitle = '';
  public newTicketDesc = '';
  public newSubject = '';
  public newBody = '';

  public ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.http.get<Ticket[]>('/api/tickets').subscribe(data => this.tickets.set(data));
    this.http.get<Newsletter[]>('/api/newsletters').subscribe(data => this.newsletters.set(data));
  }

  public submitTicket(): void {
    this.http
      .post('/api/tickets', { title: this.newTicketTitle, description: this.newTicketDesc, userId: 1 })
      .subscribe(() => {
        this.newTicketTitle = '';
        this.newTicketDesc = '';
        this.loadData();
      });
  }

  public publishNewsletter(): void {
    this.http.post('/api/newsletters', { subject: this.newSubject, body: this.newBody }).subscribe(() => {
      this.newSubject = '';
      this.newBody = '';
      this.loadData();
    });
  }
}
