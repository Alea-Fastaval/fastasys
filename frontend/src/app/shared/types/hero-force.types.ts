export interface HeroForceShift {
  id: number;
  categoryId: number;
  categoryName: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  currentParticipants: number;
}

export interface HeroForceCategory {
  id: number;
  name: string;
  description: string;
  colorHex: string;
}
