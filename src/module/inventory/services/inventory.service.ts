/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryDto, UpdateInventoryDto } from '../dto';
import { Inventory } from '../entities/inventory.entity';
import { Product } from 'src/module/product/entities/product.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory) private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}

  async createInventory(createInventoryDto: CreateInventoryDto) {
    const product = await this.productRepository.findOneBy({ id: createInventoryDto.productId });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const inventory = this.inventoryRepository.create({
      ...createInventoryDto,
      product,
    });

    return await this.inventoryRepository.save(inventory);
  }

  async findAll() {
    return await this.inventoryRepository.find({ relations: ['product'] });
  }

  async findOne(id: number) {
    const inventory = await this.inventoryRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    return inventory;
  }

  async updateInventory(id: number, updateInventoryDto: UpdateInventoryDto) {
    const inventory = await this.inventoryRepository.findOneBy({ id });
    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    if (updateInventoryDto.productId) {
      const product = await this.productRepository.findOneBy({ id: updateInventoryDto.productId });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      inventory.product = product;
    }

    Object.assign(inventory, updateInventoryDto);
    await this.inventoryRepository.save(inventory);
    return inventory;
  }

  async deleteInventory(id: number) {
    const inventory = await this.inventoryRepository.findOneBy({ id });
    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    await this.inventoryRepository.softDelete({ id });
    return inventory;
  }
}
