import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterSupplierDto } from '../dtos/register-supplier.dto';
import { SupplierService } from '../services/supplier.service';

@Controller('suppliers')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}
  @Post()
  create(@Body() supplier: RegisterSupplierDto) {
    return this.supplierService.registerSupplier(supplier);
  }

  @Get()
  find() {
    return this.supplierService.allSuppliers();
  }
}
