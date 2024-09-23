/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { Category } from 'src/module/category/entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productModel: Repository<Product>,
    @InjectRepository(Category) private readonly categoryModel: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, categoryId } = createProductDto;

    // Check if the product already exists
    const existingProduct = await this.productModel.findOne({ name }).exec();
    if (existingProduct) {
      throw new BadRequestException('Product already exists.');
    }

    // Validate the category exists
    const category = await this.categoryModel.findById(categoryId).exec();
    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    // Create the product
    const product = new this.productModel({
      ...createProductDto,
      category, // Add the category reference
    });
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('category').exec(); // Populate the category data
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).populate('category').exec();
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const { categoryId } = updateProductDto;

    // Validate if the product exists
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    // Validate if a new category is being provided
    if (categoryId) {
      const category = await this.categoryModel.findById(categoryId).exec();
      if (!category) {
        throw new NotFoundException('Category not found.');
      }
      product.category = category;
    }

    // Update product data
    Object.assign(product, updateProductDto);

    return product.save();
  }

  async remove(id: string): Promise<Product> {
    const product = await this.productModel.findByIdAndRemove(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    return product;
  }
}