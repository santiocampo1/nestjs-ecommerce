import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductActivatedEvent } from 'src/api/product/events/product-activated.event';

@Injectable()
export class ProductActivatedListener {
  private readonly logger = new Logger(ProductActivatedListener.name);

  @OnEvent('product.activated')
  async handleProductActivated(event: ProductActivatedEvent) {
    this.logger.log(
      `Product activated: ${event.title} (ID: ${event.productId})`,
    );

    this.logger.log(
      `Product ${event.productId} is now visible in catalog`,
    );
  }
}