import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from 'src/database/entities/inventory.entity';
import { InventoryService } from './services/inventory.service';
import { InventoryController } from './controllers/inventory.controller';
import { ProductCreatedListener } from './listeners/product-created.listener';
import { ProductActivatedListener } from './listeners/product-activated.listener';
import { ProductDeletedListener } from './listeners/product-deleted.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  controllers: [InventoryController],
  providers: [
    InventoryService,
    ProductCreatedListener,
    ProductActivatedListener,
    ProductDeletedListener,
  ],
  exports: [InventoryService],
})
export class InventoryModule {}