import {
  IsMobilePhone,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterSupplierDto {
  @IsString()
  @MinLength(3, {
    message: 'Supplier name is too short',
  })
  name: string;
  @IsMobilePhone('es-MX')
  @IsOptional()
  contact: string;
}
