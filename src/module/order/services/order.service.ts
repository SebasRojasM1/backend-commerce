/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dto';
import { Order } from '../entities/order.entity';
import { User } from 'src/module/user/entities/user.entity';
import { OrderProduct } from 'src/module/order-product/entities/order-product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(OrderProduct) private readonly orderProductRepository: Repository<OrderProduct>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const user = await this.userRepository.findOneBy({ id: createOrderDto.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const order = this.orderRepository.create({ ...createOrderDto, user });
    return await this.orderRepository.save(order);
  }

  async findAll() {
    return await this.orderRepository.find({ relations: ['user', 'OrderProducts'] });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'OrderProducts'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (updateOrderDto.userId) {
      const user = await this.userRepository.findOneBy({ id: updateOrderDto.userId });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      order.user = user;
    }

    Object.assign(order, updateOrderDto);
    await this.orderRepository.save(order);
    return order;
  }

  async deleteOrder(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await this.orderRepository.softDelete({ id });
    return order;
  }
}
