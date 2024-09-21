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


@Module({
  imports: [],
  controllers: [AddressController, CategoryController, InventoryController, OrderController, OrderProductController, PaymentController, ProductController, ReviewController, UserController],
  providers: [AddressService, CategoryService, InventoryService, OrderService, OrderProductService, PaymentService, ProductService, ReviewService, UserService],
})
export class AppModule {}
