import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateVariantDto {
  @IsUUID()
  product: string;
  @IsInt()
  quantity: number;
  @IsString()
  type: number;
  @IsString()
  size: number;
}
