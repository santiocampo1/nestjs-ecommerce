import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductDeletedEvent } from 'src/api/product/events/product-deleted.event';
import { InventoryService } from '../services/inventory.service';

@Injectable()
export class ProductDeletedListener {
  private readonly logger = new Logger(ProductDeletedListener.name);

  constructor(private readonly inventoryService: InventoryService) {}

  @OnEvent('product.deleted')
  async handleProductDeleted(event: ProductDeletedEvent) {
    this.logger.log(
      `Product deleted event received: productId=${event.productId}`,
    );

    this.logger.log(
      `Inventory cleanup triggered for product ${event.productId}`,
    );
  }
}