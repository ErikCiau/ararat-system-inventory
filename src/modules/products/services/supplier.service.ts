import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../models';
import { RegisterSupplierDto } from '../dtos/register-supplier.dto';
import { UpdateSupplierDto } from '../dtos/update-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  registerSupplier(registerSupplier: RegisterSupplierDto) {
    const supplier = this.supplierRepository.create(registerSupplier);
    return this.supplierRepository.save(supplier);
  }

  allSuppliers() {
    return this.supplierRepository.find();
  }

  updateSupplier(supplierId: string, supplier: UpdateSupplierDto) {
    return this.supplierRepository.update(supplierId, supplier);
  }
}
