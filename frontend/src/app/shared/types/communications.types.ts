export interface Newsletter {
  id: number;
  subject: string;
  body: string;
  createdAt: string;
  sentAt?: string;
  recipientCount: number;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
  createdBy: string;
  createdAt: string;
}

export interface TicketMessage {
  id: number;
  ticketId: number;
  userId: number;
  userName: string;
  content: string;
  createdAt: string;
}

export interface CreateTicketDto {
  title: string;
  description: string;
  userId: number;
}

export interface CreateNewsletterDto {
  subject: string;
  body: string;
}
