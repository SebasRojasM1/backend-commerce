import { Module } from '@nestjs/common';
import { ProductModule } from './module/product/product.module';
import { CategoryModule } from './module/category/category.module';
import { OrderModule } from './module/order/order.module';


@Module({
  imports: [ProductModule, CategoryModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
