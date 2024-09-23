/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderProductDto, UpdateOrderProductDto } from '../dto';
import { OrderProduct } from '../entities/order-product.entity';
import { Order } from 'src/module/order/entities/order.entity';
import { Product } from 'src/module/product/entities/product.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct) private readonly orderProductRepository: Repository<OrderProduct>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}

  async createOrderProduct(createOrderProductDto: CreateOrderProductDto) {
    const order = await this.orderRepository.findOneBy({ id: createOrderProductDto.orderId });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const product = await this.productRepository.findOneBy({ id: createOrderProductDto.productId });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const orderProduct = this.orderProductRepository.create({
      ...createOrderProductDto,
      order,
      product,
    });

    return await this.orderProductRepository.save(orderProduct);
  }

  async findAll() {
    return await this.orderProductRepository.find({ relations: ['order', 'product'] });
  }

  async findOne(id: number) {
    const orderProduct = await this.orderProductRepository.findOne({
      where: { id },
      relations: ['order', 'product'],
    });

    if (!orderProduct) {
      throw new NotFoundException('OrderProduct not found');
    }

    return orderProduct;
  }

  async updateOrderProduct(id: number, updateOrderProductDto: UpdateOrderProductDto) {
    const orderProduct = await this.orderProductRepository.findOneBy({ id });
    if (!orderProduct) {
      throw new NotFoundException('OrderProduct not found');
    }

    if (updateOrderProductDto.orderId) {
      const order = await this.orderRepository.findOneBy({ id: updateOrderProductDto.orderId });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      orderProduct.order = order;
    }

    if (updateOrderProductDto.productId) {
      const product = await this.productRepository.findOneBy({ id: updateOrderProductDto.productId });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      orderProduct.product = product;
    }

    Object.assign(orderProduct, updateOrderProductDto);
    await this.orderProductRepository.save(orderProduct);
    return orderProduct;
  }

  async deleteOrderProduct(id: number) {
    const orderProduct = await this.orderProductRepository.findOneBy({ id });
    if (!orderProduct) {
      throw new NotFoundException('OrderProduct not found');
    }

    await this.orderProductRepository.softDelete({ id });
    return orderProduct;
  }
}
