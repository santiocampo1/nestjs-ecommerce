import { IsNumber, Min } from 'class-validator';

export class UpdateInventoryDto {
  @IsNumber()
  @Min(0)
  quantity: number;
}

export class InventoryResponseDto {
  id: number;
  productId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}