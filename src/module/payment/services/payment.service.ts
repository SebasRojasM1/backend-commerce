/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto, UpdatePaymentDto } from '../dto';
import { Payment } from '../entities/payment.entity';
import { Order } from 'src/module/order/entities/order.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const order = await this.orderRepository.findOneBy({ id: createPaymentDto.orderId });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      order,
    });

    return await this.paymentRepository.save(payment);
  }

  async findAll() {
    return await this.paymentRepository.find({ relations: ['order'] });
  }

  async findOne(id: number) {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['order'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async updatePayment(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (updatePaymentDto.orderId) {
      const order = await this.orderRepository.findOneBy({ id: updatePaymentDto.orderId });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      payment.order = order;
    }

    Object.assign(payment, updatePaymentDto);
    await this.paymentRepository.save(payment);
    return payment;
  }

  async deletePayment(id: number) {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    await this.paymentRepository.softDelete({ id });
    return payment;
  }
}
