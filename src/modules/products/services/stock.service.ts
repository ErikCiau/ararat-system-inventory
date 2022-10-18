import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from '../models';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  public updateStock(stock: Stock, decreasedQuantity: number) {
    const { id, quantity } = stock;

    if (quantity < decreasedQuantity) {
      throw new BadRequestException('No stock available');
    }

    const newQuantity = quantity - decreasedQuantity;

    return this.stockRepository.update(id, { quantity: newQuantity });
  }
}
