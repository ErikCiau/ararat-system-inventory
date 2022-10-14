import { Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrdersService) {}

  @Post()
  createOrder(createOrder: CreateOrderDto) {
    return this.orderService.createOrder(createOrder);
  }
}
