import { Module } from '@nestjs/common';
import { OrderProductService } from './services/order-product.service';
import { OrderProductController } from './controllers/order-product.controller';

@Module({
  controllers: [OrderProductController],
  providers: [OrderProductService],
})
export class OrderProductModule {}
