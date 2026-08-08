export interface FoodType {
  id: number;
  name: string;
  nameEnglish: string;
  price: number;
  isActive: boolean;
}

export interface WearItem {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  stock: number;
}

export interface Room {
  id: number;
  name: string;
  location: string;
  capacity: number;
  description: string;
}

export interface OrderFoodDto {
  participantId: number;
  foodTypeId: number;
  date: string;
  quantity?: number;
}

export interface OrderWearDto {
  participantId: number;
  wearItemId: number;
  quantity?: number;
}
