import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { InventoryService } from '../services/inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('product/:productId')
  async getProductStock(@Param('productId', ParseIntPipe) productId: number) {
    return this.inventoryService.getStockByProductId(productId);
  }
}