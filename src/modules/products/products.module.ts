import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/products.controller';
import { SizesController } from './controllers/sizes.controller';
import { SupplierController } from './controllers/suppliers.controller';
import { TypesController } from './controllers/types.controller';
import { VariantsController } from './controllers/variants.controller';

import { Product, Stock, Supplier, Variant, Type, Size } from './models';
import {
  SizeService,
  TypeService,
  StockService,
  VariantService,
  ProductServices,
  SupplierService,
} from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Stock, Supplier, Variant, Type, Size]),
  ],
  providers: [
    ProductServices,
    SupplierService,
    SizeService,
    TypeService,
    VariantService,
    StockService,
  ],
  controllers: [
    ProductController,
    SupplierController,
    SizesController,
    TypesController,
    VariantsController,
  ],
  exports: [VariantService, StockService],
})
export class ProductsModule {}
