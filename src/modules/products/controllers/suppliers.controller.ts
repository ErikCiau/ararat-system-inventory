import { Body, Controller, Get, Post, Param, Put } from '@nestjs/common';
import { RegisterSupplierDto } from '../dtos/register-supplier.dto';
import { UpdateSupplierDto } from '../dtos/update-supplier.dto';
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

  @Put(':id')
  update(@Param('id') supplierId: string, @Body() supplier: UpdateSupplierDto) {
    return this.supplierService.updateSupplier(supplierId, supplier);
  }
}
