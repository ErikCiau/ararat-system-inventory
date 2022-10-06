import { BadRequestException, Injectable } from '@nestjs/common';
import { Employee } from 'src/modules/employees/models/employee.model';
import { SignOnItentDTO } from '../dtos/sign-on-intent.dto';
import { GenerateUsernameService } from './generate-username.service';
import * as Crypto from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from 'src/modules/employees/services/employee.service';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private usernameService: GenerateUsernameService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, rawPassword: string) {
    try {
      const userOrFail = await this.employeeService.findOneWhere({
        where: {
          username,
        },
      });

      const isPasswordValid = await this.comparePassword(
        rawPassword,
        userOrFail.password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException(
          'username or password is incorrect, try again more later',
        );
      }

      const { password, ...rest } = userOrFail;
      return rest;
    } catch (error) {
      throw new BadRequestException(
        'username or password is incorrect, try again more later',
      );
    }
  }

  async logIn(user: any) {
    const { username, id } = user;
    const access_token = await this.jwtService.signAsync({ id, username });
    return {
      access_token,
    };
  }

  async getMyProfile(id: string) {
    const user = await this.employeeService.findOneWhere({
      where: {
        id,
      },
    });

    const { password, updatedAt, createdAt, ...profile } = user;
    return profile;
  }

  async SignOn(signOn: SignOnItentDTO): Promise<Partial<Employee>> {
    const { name, lastname, password: rawPassword, contact } = signOn;

    const username = await this.usernameService.execute(name, lastname);
    const password = await this.hashPassword(rawPassword);

    const employee = {
      name,
      lastname,
      role: 'seller',
      username,
      password,
      contact,
    };

    const employeeCreated = await this.employeeService.persist(employee);
    const { password: securePassword, ...rest } = employeeCreated;
    return rest;
  }

  private hashPassword(rawPassword: string): Promise<string> {
    return Crypto.hash(rawPassword, 10);
  }

  private comparePassword(rawPassword: string, hash: string): Promise<boolean> {
    return Crypto.compare(rawPassword, hash);
  }
}
