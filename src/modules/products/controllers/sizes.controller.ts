import { Body, Controller, Post } from '@nestjs/common';
import { CreateSizeDto } from '../dtos/create-size.dto';
import { SizeService } from '../services/size.serice';

@Controller('sizes')
export class SizesController {
  constructor(private sizeService: SizeService) {}

  @Post()
  createSize(@Body() createSize: CreateSizeDto) {
    return this.sizeService.createSize(createSize);
  }
}
