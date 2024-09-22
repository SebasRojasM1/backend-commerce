import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateAddressDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;
  
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    orderId?: number;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    addressLine1: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    addressLine2?: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    state: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    zipCode: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    country: string;
}
