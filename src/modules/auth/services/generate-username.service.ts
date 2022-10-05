import { BadRequestException, Injectable } from '@nestjs/common';
import { EmployeeService } from 'src/modules/employees/services/employee.service';

@Injectable()
export class GenerateUsernameService {
  constructor(
    private employeeRepo: EmployeeService
  ) { }

  public async execute(name: string, lastname: string): Promise<string> {
    const username = `${name.toLowerCase()}${lastname.toLowerCase()}-ararat`
    const usernameFound = await this.employeeRepo.findOneWhere({
      where: {
        username
      }
    })
    if (usernameFound) {
      throw new BadRequestException("username al ready exist")
    }
    return username
  }
}
