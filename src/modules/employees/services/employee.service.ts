import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Employee } from '../models/employee.model';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  findOneWhere(where: FindOneOptions): Promise<Employee> {
    return this.employeeRepository.findOneOrFail(where);
  }

  persist(user: Partial<Employee>) {
    const employee = this.employeeRepository.create(user);
    return this.employeeRepository.save(employee);
  }
}
