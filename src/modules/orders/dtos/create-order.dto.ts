import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class ProductDto {
  @IsPositive()
  @IsInt()
  public quantity: number;
  @IsUUID()
  public product: string;
  @IsString()
  public variant: string;
}
export class CreateOrderDto {
  @IsString()
  public customer: string;
  @IsOptional()
  @IsString()
  public employee: string;
  @ValidateNested()
  public products: ProductDto[];
}
