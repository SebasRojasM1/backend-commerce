/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../dto';
import { Product } from '../entities/product.entity';
import { Category } from 'src/module/category/entities/category.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const existingProduct = await this.productRepository.findOneBy({ name: createProductDto.name });

    if (existingProduct) {
      throw new BadRequestException('Product already exists.');
    }

    const category = await this.categoryRepository.findOneBy({ id: createProductDto.categoryId });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const product = this.productRepository.create({
      ...createProductDto,
      category,
    });

    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOneBy({ id: updateProductDto.categoryId });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.category = category;
    }

    Object.assign(product, updateProductDto);
    await this.productRepository.save(product);
    return product;
  }

  async deleteProduct(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.softDelete({ id });
    return product;
  }
}
