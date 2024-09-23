/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto, UpdateAddressDto } from '../dto';
import { Address } from '../entities/address.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Order } from 'src/module/order/entities/order.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private readonly addressRepository: Repository<Address>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>
  ) {}

  async createAddress(createAddressDto: CreateAddressDto) {
    const user = await this.userRepository.findOneBy({ id: createAddressDto.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let order = null;
    if (createAddressDto.orderId) {
      order = await this.orderRepository.findOneBy({ id: createAddressDto.orderId });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
    }

    const address = this.addressRepository.create({
      ...createAddressDto,
      user,
      order
    });

    return await this.addressRepository.save(address);
  }

  async findAll() {
    return await this.addressRepository.find({ relations: ['user', 'order'] });
  }

  async findOne(id: number) {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['user', 'order'],
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }

  async updateAddress(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressRepository.findOneBy({ id });
    if (!address) {
      throw new NotFoundException('Address not found');
    }

    if (updateAddressDto.userId) {
      const user = await this.userRepository.findOneBy({ id: updateAddressDto.userId });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      address.user = user;
    }

    if (updateAddressDto.orderId) {
      const order = await this.orderRepository.findOneBy({ id: updateAddressDto.orderId });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      address.order = order;
    }

    await this.addressRepository.save(address);
    return address;
  }

  async deleteAddress(id: number) {
    const address = await this.addressRepository.findOneBy({ id });
    if (!address) {
      throw new NotFoundException('Address not found');
    }

    await this.addressRepository.softDelete({ id });
    return address;
  }
}
