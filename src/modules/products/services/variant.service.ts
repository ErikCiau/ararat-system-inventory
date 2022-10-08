import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVariantDto } from '../dtos/create-variant.dto';
import { Product, Size, Stock, Variant, Type } from '../models';

export class VariantService {
  constructor(
    @InjectRepository(Variant)
    private variantRepository: Repository<Variant>,
  ) {}

  createVariant(createVariant: CreateVariantDto) {
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

    return this.variantRepository.save(variant);
  }
}
