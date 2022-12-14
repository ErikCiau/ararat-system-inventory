import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Product, Supplier } from '../models';

@Injectable()
export class ProductServices {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(createProduct: CreateProductDto) {
    try {
      const { supplier: supplierId, ...productDto } = createProduct;
      const supplier = new Supplier();
      supplier.id = supplierId;

      const product = this.productRepository.create({
        ...productDto,
        supplier: supplier,
      });

      return this.productRepository.save(product);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.productRepository.find({
      relations: {
        variants: {
          size: true,
          stock: true,
          type: true,
        },
        supplier: true,
      },
    });
  }

  async findOne(productId: string, relations?: any) {
    return this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: {
        ...relations,
      },
    });
  }
}
