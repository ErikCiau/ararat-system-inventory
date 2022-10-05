import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeesModule } from './modules/employees/employees.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CustomersModule } from './modules/customers/customers.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'erikciau',
      password: 'root',
      database: 'ararat-inventory',
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
