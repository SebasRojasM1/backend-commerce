import { Module } from '@nestjs/common';
import { ProductModule } from './module/product/product.module';
import { CategoryModule } from './module/category/category.module';
import { OrderModule } from './module/order/order.module';
import { OrderProductModule } from './module/order-product/order-product.module';
import { PaymentModule } from './module/payment/payment.module';
import { ReviewModule } from './module/review/review.module';
import { AddressModule } from './module/address/address.module';


@Module({
  imports: [ProductModule, CategoryModule, OrderModule, OrderProductModule, PaymentModule, ReviewModule, AddressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
