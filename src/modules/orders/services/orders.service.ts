import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/modules/customers/models/customer.model';
import { Employee } from 'src/modules/employees/models/employee.model';
import { Product, Stock, Variant } from 'src/modules/products/models';
import { Repository } from 'typeorm';
import { CreateOrderDto, ProductDto } from '../dtos/create-order.dto';
import { OrderLine } from '../models/order-line.model';
// import { OrderLine } from '../models/order-line.model';
import { Order } from '../models/order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Variant)
    private variantRepository: Repository<Variant>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
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

    const orderLines = await Promise.all(
      products.map((p) => this.getProduct(p)),
    );
    // estoy asumiendo que cuando se cree un order line se le asignara
    // automaticamente el id de la orden porque use el metodo en
    // cascada
    const order = this.orderRepository.create({
      customer,
      employee,
      orderLines,
    });

    return this.orderRepository.save(order);
  }

  async getProduct(productDto: ProductDto): Promise<OrderLine> {
    const { variant: variantId, quantity, product: productId } = productDto;
    let variant: Variant;

    try {
      variant = await this.variantRepository.findOne({
        where: {
          id: variantId,
        },
        relations: {
          product: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }

    const orderLine = new OrderLine();
    const product = new Product();
    product.id = productId;

    await this.updateStock(variant, quantity);

    orderLine.unitPrice = variant.product.price;
    orderLine.quantity = quantity;
    orderLine.discount = 0;
    orderLine.total = variant.product.price * quantity;
    orderLine.product = product;
    orderLine.variant = variant;

    return orderLine;
  }

  async updateStock(
    variant: Variant,
    decreasedQuantity: number,
  ): Promise<void> {
    const { id, quantity } = variant.stock;

    if (quantity < decreasedQuantity) {
      throw 'No stock available';
    }

    const currentQuantity = quantity - decreasedQuantity;

    await this.stockRepository.update(id, {
      quantity: currentQuantity,
    });
  }
}
