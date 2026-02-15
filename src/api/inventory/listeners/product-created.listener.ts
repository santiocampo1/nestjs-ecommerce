import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductCreatedEvent } from 'src/api/product/events/product-created.event';
import { InventoryService } from '../services/inventory.service';

@Injectable()
export class ProductCreatedListener {
  private readonly logger = new Logger(ProductCreatedListener.name);

  constructor(private readonly inventoryService: InventoryService) {}

  @OnEvent('product.created')
  async handleProductCreated(event: ProductCreatedEvent) {
    this.logger.log(
      `Product created event received: productId=${event.productId}`,
    );

    try {
      await this.inventoryService.createInitialStock(event.productId, 0);
      
      this.logger.log(
        `Initial inventory created for product ${event.productId}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to create inventory for product ${event.productId}`,
        error.stack,
      );
    }
  }
}