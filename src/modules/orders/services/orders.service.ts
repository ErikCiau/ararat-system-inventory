import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/modules/customers/models/customer.model';
import { Employee } from 'src/modules/employees/models/employee.model';
import { Product } from 'src/modules/products/models';
import { StockService } from 'src/modules/products/services/stock.service';
import { VariantService } from 'src/modules/products/services/variant.service';
import { Repository } from 'typeorm';
import { CreateOrderDto, ProductDto } from '../dtos/create-order.dto';
import { OrderLine } from '../models/order-line.model';
import { Order } from '../models/order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private variantService: VariantService,
    private stockService: StockService,
  ) {}

  async createOrder(createOrder: CreateOrderDto) {
    const {
      customer: customerId,
      employee: employeeId,
      products,
    } = createOrder;
    const customer = new Customer();
    customer.id = customerId;
    const employee = new Employee();
    employee.id = employeeId;

    if (!products) {
      throw new BadRequestException('You must have at least one product');
    }

    let orderLines: OrderLine[];
    try {
      orderLines = await Promise.all(products.map((p) => this.getProduct(p)));
    } catch (error) {
      console.log(error);
    }

    const order = this.orderRepository.create({
      customer,
      employee,
      orderLines,
    });

    return this.orderRepository.save(order);
  }

  async getProduct(productDto: ProductDto): Promise<OrderLine> {
    const { variant: variantId, quantity, product: productId } = productDto;

    const variant = await this.variantService.findOne(variantId, {
      product: true,
      stock: true,
    });

    const orderLine = new OrderLine();
    const product = new Product();
    product.id = productId;

    await this.stockService.updateStock(variant.stock, quantity);

    orderLine.unitPrice = variant.product.price;
    orderLine.quantity = quantity;
    orderLine.discount = 0;
    orderLine.total = variant.product.price * quantity;
    orderLine.product = product;
    orderLine.variant = variant;

    return orderLine;
  }
}
