import { Module } from '@nestjs/common';
import { AddressController } from './module/address/controllers/address.controller';
import { CategoryController } from './module/category/controllers/category.controller';
import { InventoryController } from './module/inventory/controllers/inventory.controller';
import { OrderController } from './module/order/controllers/order.controller';
import { OrderProductController } from './module/order-product/controllers/order-product.controller';
import { PaymentController } from './module/payment/controllers/payment.controller';
import { ProductController } from './module/product/controllers/product.controller';
import { ReviewController } from './module/review/controllers/review.controller';
import { UserController } from './module/user/controllers/user.controller';
import { AddressService } from './module/address/services/address.service';
import { CategoryService } from './module/category/services/category.service';
import { InventoryService } from './module/inventory/services/inventory.service';
import { OrderService } from './module/order/services/order.service';
import { OrderProductService } from './module/order-product/services/order-product.service';
import { PaymentService } from './module/payment/services/payment.service';
import { ProductService } from './module/product/services/product.service';
import { ReviewService } from './module/review/services/review.service';
import { UserService } from './module/user/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './module/address/entities/address.entity';
import { Category } from './module/category/entities/category.entity';
import { Inventory } from './module/inventory/entities/inventory.entity';
import { Order } from './module/order/entities/order.entity';
import { OrderProduct } from './module/order-product/entities/order-product.entity';
import { Payment } from './module/payment/entities/payment.entity';
import { Product } from './module/product/entities/product.entity';
import { Review } from './module/review/entities/review.entity';
import { User } from './module/user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [Address, Category, Inventory, Order, OrderProduct, Payment, Product, Review, User],
      extra: {
        ssl: true,
      },
    }),
    TypeOrmModule.forFeature([Address, Category, Inventory, Order, OrderProduct, Payment, Product, Review, User]),
  ],
  controllers: [AddressController, CategoryController, InventoryController, OrderController, OrderProductController, PaymentController, ProductController, ReviewController, UserController],
  providers: [AddressService, CategoryService, InventoryService, OrderService, OrderProductService, PaymentService, ProductService, ReviewService, UserService],
})
export class AppModule {}
