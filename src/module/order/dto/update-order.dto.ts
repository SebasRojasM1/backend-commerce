import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateOrderDto {
    @ApiProperty()
    @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(['pending', 'shipped', 'delivered', 'canceled'])
  status: 'pending' | 'shipped' | 'delivered' | 'canceled';
}
