export interface Boardgame {
  id: number;
  title: string;
  author: string;
  publisher: string;
  minPlayers: number;
  maxPlayers: number;
  playingTimeMinutes: number;
  barcode: string;
  isPresent: boolean;
}

export interface BoardgameLoan {
  id: number;
  boardgameId: number;
  boardgameTitle: string;
  participantId: number;
  participantName: string;
  loanedAt: string;
  returnedAt?: string;
}

export interface CheckoutBoardgameDto {
  participantId: number;
}
