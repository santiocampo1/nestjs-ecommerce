import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from 'src/database/entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async createInitialStock(productId: number, quantity: number = 0): Promise<Inventory> {
    const inventory = this.inventoryRepository.create({
      productId,
      quantity,
    });
    return this.inventoryRepository.save(inventory);
  }

  async getStockByProductId(productId: number): Promise<Inventory | null> {
    return this.inventoryRepository.findOne({
      where: { productId },
    });
  }

  async updateStock(productId: number, quantity: number): Promise<Inventory> {
    const inventory = await this.getStockByProductId(productId);
    
    if (!inventory) {
      throw new NotFoundException(`Inventory for product ${productId} not found`);
    }

    inventory.quantity = quantity;
    return this.inventoryRepository.save(inventory);
  }

  async increaseStock(productId: number, amount: number): Promise<Inventory> {
    const inventory = await this.getStockByProductId(productId);
    
    if (!inventory) {
      throw new NotFoundException(`Inventory for product ${productId} not found`);
    }

    inventory.quantity += amount;
    return this.inventoryRepository.save(inventory);
  }

  async decreaseStock(productId: number, amount: number): Promise<Inventory> {
    const inventory = await this.getStockByProductId(productId);
    
    if (!inventory) {
      throw new NotFoundException(`Inventory for product ${productId} not found`);
    }

    if (inventory.quantity < amount) {
      throw new Error(`Insufficient stock for product ${productId}`);
    }

    inventory.quantity -= amount;
    return this.inventoryRepository.save(inventory);
  }
}