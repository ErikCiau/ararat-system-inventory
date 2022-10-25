// TODO: add validations with class validator package
import {
  IsString,
  MinLength,
  Min,
  IsNumber,
  IsPositive,
  IsNumberString,
} from 'class-validator';
export class UpdateProductInfo {
  @IsString()
  @MinLength(1)
  name: string;
  @Min(1)
  @IsNumber()
  @IsPositive()
  price: number;
  @IsNumberString()
  supplier: string;
}
