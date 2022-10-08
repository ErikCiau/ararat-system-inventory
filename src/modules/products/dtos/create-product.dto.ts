import {
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @MinLength(5, {
    message: 'product name is too short',
  })
  @MaxLength(25, {
    message: 'product name is too long',
  })
  name: string;
  @MinLength(10, {
    message: 'product description is to short',
  })
  @IsOptional()
  description: string;
  @IsOptional()
  cover?: string;
  @IsPositive()
  @Min(0)
  price: number;
  @IsString()
  supplier: string;
}
