import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductServices } from '../services/product.services';
import { VariantService } from '../services/variant.service';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductServices,
    private variantService: VariantService,
  ) {}

  @Post()
  postProduct(@Body() createProduct: CreateProductDto) {
    return this.productService.createProduct(createProduct);
  }

  @Get()
  products() {
    return this.productService.findAll();
  }

  @Get(':id')
  productById(@Param('id') productId: string) {
    return this.productService.findOne(productId);
  }

  @Get(':id/variants')
  variantByRepository(@Param('id') productId: string) {
    return this.variantService.variantByProduct(productId);
  }
}
