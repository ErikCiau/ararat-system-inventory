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

  async findAll() {
    const employees = await this.employeeRepository.find();
    return employees.map((employee) => {
      const { password, ...rest } = employee;
      return rest;
    });
  }

  findOneWhere(where: FindOneOptions): Promise<Employee> {
    return this.employeeRepository.findOneOrFail(where);
  }

  async persist(user: Partial<Employee>): Promise<Employee> {
    const { id, role, username, createdAt, ...updatable } = user;
    if (id) {
      await this.employeeRepository.update({ id }, updatable);
      return this.findOneWhere({
        where: {
          id,
        },
      });
    }
    const employee = this.employeeRepository.create(user);
    return this.employeeRepository.save(employee);
  }
}
