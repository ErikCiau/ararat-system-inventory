import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalAuthStrategy } from './strategies/local-auth.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { GenerateUsernameService } from './services/generate-username.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '15m',
      },
    }),
    EmployeesModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GenerateUsernameService,
    LocalAuthStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
