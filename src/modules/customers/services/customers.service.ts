import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Customer } from '../models/customer.model';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findOneWhere(where: FindOneOptions<Customer>) {
    return this.customerRepository.findOneOrFail(where);
  }

  async persist(customer: Partial<Customer>) {
    const { id, name, contact } = customer;
    if (id) {
      await this.customerRepository.update(id, { name, contact });
      return this.findOneWhere({
        where: {
          id,
        },
      });
    }
    const customerCreated = this.customerRepository.create(customer);
    return this.customerRepository.save(customerCreated);
  }
}
