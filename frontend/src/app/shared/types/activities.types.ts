export interface Activity {
  id: number;
  title: string;
  titleEnglish: string;
  description: string;
  author: string;
  minParticipants: number;
  maxParticipants: number;
  durationMinutes: number;
  category: string;
  isActive?: boolean;
}

export interface CreateActivityDto {
  title: string;
  titleEnglish: string;
  description: string;
  author: string;
  minParticipants: number;
  maxParticipants: number;
  durationMinutes: number;
  category: string;
}

export interface ActivitySchedule {
  id: number;
  activityId: number;
  startTime: string;
  endTime: string;
  roomId?: number;
}
