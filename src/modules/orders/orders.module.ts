import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock, Variant } from '../products/models';
import { OrderController } from './controllers/orders.controller';
import { OrderLine } from './models/order-line.model';
import { Order } from './models/order.model';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderLine, Variant, Stock])],
  controllers: [OrderController],
  providers: [OrdersService],
})
export class OrdersModule {}
