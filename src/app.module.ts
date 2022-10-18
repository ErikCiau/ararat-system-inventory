import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeesModule } from './modules/employees/employees.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CustomersModule } from './modules/customers/customers.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'erikciau',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_DATABASE || 'ararat-inventory',
      synchronize: true,
      autoLoadEntities: true,
    }),
    EmployeesModule,
    ProductsModule,
    OrdersModule,
    CustomersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
