import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AddCustomerDto } from './dtos/add-customer.dto';
import { CustomerService } from './services/customers.service';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() addCustomer: AddCustomerDto) {
    return this.customerService.persist(addCustomer);
  }
}
