import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSizeDto } from '../dtos/create-size.dto';
import { Size } from '../models';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
  ) {}
  createSize({ value }: CreateSizeDto) {
    const size = this.sizeRepository.create({
      value,
    });
    return this.sizeRepository.save(size);
  }
}
