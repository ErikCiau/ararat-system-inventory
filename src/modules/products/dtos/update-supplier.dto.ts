import { IsMobilePhone, IsString } from 'class-validator';

export class UpdateSupplierDto {
  @IsString()
  name: string;

  @IsString()
  @IsMobilePhone()
  contact: string;
}
