import { Controller, Body, Post } from '@nestjs/common';
import { CreateTypeDto } from '../dtos/create-type.dto';
import { TypeService } from '../services/type.service';

@Controller('types')
export class TypesController {
  constructor(private typeService: TypeService) {}

  @Post()
  create(@Body() createType: CreateTypeDto) {
    return this.typeService.createType(createType);
  }
}
