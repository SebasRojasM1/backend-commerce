import { Module } from '@nestjs/common';
import { ProductModule } from './module/product/product.module';
import { CategoryModule } from './module/category/category.module';


@Module({
  imports: [ProductModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
