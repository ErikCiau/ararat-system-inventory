import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from './services/employee.service';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  showAll() {
    return this.employeeService.findAll();
  }
}
