import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ticket, Newsletter } from '@shared/types';
import { Badge, Card } from '@shared/components';

@Component({
  selector: 'app-communications',
  imports: [CommonModule, FormsModule, Card, Badge],
  templateUrl: './communications.html',
  styleUrl: './communications.scss',
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
