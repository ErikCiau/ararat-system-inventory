import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees.controller';
import { Employee } from './models/employee.model';
import { EmployeeService } from './services/employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeesModule {}
