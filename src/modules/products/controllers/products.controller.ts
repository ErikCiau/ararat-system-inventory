import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductServices } from '../services/product.services';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductServices) {}

  @Post()
  postProduct(@Body() createProduct: CreateProductDto) {
    console.log(createProduct);
    return this.productService.createProduct(createProduct);
  }
}
