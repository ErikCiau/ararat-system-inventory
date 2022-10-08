import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/products.controller';
import { SizesController } from './controllers/sizes.controller';
import { SupplierController } from './controllers/suppliers.controller';
import { TypesController } from './controllers/types.controller';
import { VariantsController } from './controllers/variants.controller';

import { Product, Stock, Supplier, Variant, Type, Size } from './models';
import { ProductServices } from './services/product.services';
import { SizeService } from './services/size.serice';
import { SupplierService } from './services/supplier.service';
import { TypeService } from './services/type.service';
import { VariantService } from './services/variant.service';

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
  ],
  controllers: [
    ProductController,
    SupplierController,
    SizesController,
    TypesController,
    VariantsController,
  ],
})
export class ProductsModule {}
