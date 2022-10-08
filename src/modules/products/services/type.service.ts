import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeDto } from '../dtos/create-type.dto';
import { Type } from '../models';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
  ) {}

  createType({ name }: CreateTypeDto) {
    const type = this.typeRepository.create({ name });
    return this.typeRepository.save(type);
  }
}
