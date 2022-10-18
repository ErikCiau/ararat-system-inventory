import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVariantDto } from '../dtos/create-variant.dto';
import { Product, Size, Stock, Variant, Type } from '../models';

export class VariantService {
  constructor(
    @InjectRepository(Variant)
    private variantRepository: Repository<Variant>,
  ) {}

  async createVariant(createVariant: CreateVariantDto) {
    const {
      quantity,
      size: sizeId,
      product: productId,
      type: typeId,
    } = createVariant;

    const stock = new Stock();
    stock.quantity = quantity;
    const product = new Product();
    product.id = productId;
    const size = new Size();
    size.id = sizeId;
    const type = new Type();
    type.id = typeId;

    const variant = this.variantRepository.create({
      stock,
      product,
      size,
      type,
    });

    let variantSaved: Variant;

    try {
      variantSaved = await this.variantRepository.save(variant);
    } catch (error) {
      throw new InternalServerErrorException('Error to save variant');
    }

    return variantSaved;
  }

  variantByProduct(productId: string) {
    return this.variantRepository.find({
      where: {
        product: {
          id: productId,
        },
      },
      relations: {
        size: true,
        stock: true,
        type: true,
      },
    });
  }

  findOne(variantId: string, relations?: any) {
    return this.variantRepository.findOne({
      where: {
        id: variantId,
      },
      relations,
    });
  }
}
