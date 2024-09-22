import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateOrderProductDto {
    @ApiProperty()
    @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
