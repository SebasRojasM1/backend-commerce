/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryRepository.findOneBy({ name: createCategoryDto.name });

    if (existingCategory) {
      throw new BadRequestException('Category already exists.');
    }

    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    Object.assign(category, updateCategoryDto);
    await this.categoryRepository.save(category);
    return category;
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.softDelete({ id });
    return category;
  }
}
