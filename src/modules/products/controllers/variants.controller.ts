import { Controller, Post, Body } from '@nestjs/common';
import { VariantService } from '../services/variant.service';
import { CreateVariantDto } from '../dtos/create-variant.dto';

@Controller('variants')
export class VariantsController {
  constructor(private variantService: VariantService) {}

  @Post()
  create(@Body() createVariant: CreateVariantDto) {
    return this.variantService.createVariant(createVariant);
  }
}
